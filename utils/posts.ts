import { extract } from "$std/front_matter/any.ts";
import { join } from "$std/path/mod.ts";
import * as AI from "jsr:@baetheus/fun/async_iterable";
import * as A from "jsr:@baetheus/fun/array";
import { flow, pipe } from "jsr:@baetheus/fun/fn";
import * as S from "jsr:@baetheus/fun/sortable";
import * as P from "jsr:@baetheus/fun/promise";

export type Tag = string;
export interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  snippet: string;
  tags?: Tag[];
}

export function readAllPosts(
  { tag }: { tag?: string },
): Promise<readonly Post[]> {
  const postMatchesTag = byTag(tag);

  return pipe(
    Deno.readDir("./posts"),
    AI.map((file) => file.name.replace(".md", "")),
    AI.map(readPost),
    AI.collect,
    P.map(
      flow(
        A.filter(isPost),
        A.filter(postMatchesTag),
        A.sort(S.fromSort(byPublishedAt)),
      ),
    ),
  );
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
  S.sign(b.publishedAt.getTime() - a.publishedAt.getTime());
const postHasTag = (tag: string) => (post: Post) =>
  post.tags?.includes(tag) ?? false;
const byTag = (tag?: Tag) => (post: Post): boolean =>
  tag ? postHasTag(tag)(post) : true;
const aggregateTags = (tags: Tag[], post: Post) => tags.concat(post.tags ?? []);
