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

export async function getPosts({ tag }: { tag?: string }): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises: ReturnType<typeof getPost>[] = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = (await Promise.all(promises)).filter(isPost);
  posts
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return tag ? posts.filter((post) => post.tags?.includes(tag)) : posts;
}

export async function getPost(slug: string) {
  try {
    const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
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
  } catch {
    return null;
  }
}

function isPost(maybePost: Post | null): maybePost is Post {
  return maybePost !== null;
}
