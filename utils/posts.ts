import { extract } from "$std/encoding/front_matter.ts";
import { join } from "$std/path/mod.ts";

export type Tag = string;
export interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  snippet: string;
  tags?: Tag[];
}

export async function readAllPosts({ tag }: { tag?: string }): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises: ReturnType<typeof readPost>[] = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(readPost(slug));
  }
  const posts = (await Promise.all(promises))
    .filter(isPost)
    .sort(byPublishedAt);
  return tag ? posts.filter(postHasTag(tag)) : posts;
}

export function readPost(slug: string) {
  return Deno
    .readTextFile(join("./posts", `${slug}.md`))
    .then((text) => {
      const { attrs, body } = extract(text);
      const post: Post = {
        slug,
        title: attrs.title as string,
        publishedAt: new Date(attrs.published_at as string),
        content: body,
        snippet: attrs.snippet as string,
        tags: attrs.tags as Tag[],
      };
      return post;
    })
    .catch(() => null);
}

export const getAllTags = (posts: Post[]) =>
  posts.reduce<Tag[]>(aggregateTags, []);

const isPost = (maybePost: Post | null): maybePost is Post =>
  maybePost !== null;
const byPublishedAt = (a: Post, b: Post) =>
  b.publishedAt.getTime() - a.publishedAt.getTime();
const postHasTag = (tag: string) => (post: Post) => post.tags?.includes(tag);
const aggregateTags = (tags: Tag[], post: Post) => tags.concat(post.tags ?? []);
