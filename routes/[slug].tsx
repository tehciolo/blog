import { Handlers, PageProps } from "$fresh/server.ts";
import { Post, readPost } from "@/utils/posts.ts";
import { render } from "$gfm";

import "https://esm.sh/prismjs@1.27.0/components/prism-typescript?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-jsx?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-tsx?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-yaml?no-check";

import { Layout } from "@/components/Layout.tsx";
import { PostComments, PostHead, PostTags } from "@/components/post/index.ts";
import { dateLong } from "@/utils/formatting.ts";

export const handler: Handlers<Post> = {
  GET(_req, ctx) {
    const maybeRenderPost = (post: Post | null) =>
      post === null ? ctx.renderNotFound() : ctx.render(post);

    return readPost(ctx.params.slug)
      .then(maybeRenderPost);
  },
};

export default ({ data: post, url }: PageProps<Post>) => (
  <>
    <PostHead post={post} url={url} />

    <Layout>
      <div class="py-8">
        <h1 class="text-5xl font-bold mb-2">{post.title}</h1>

        <PostTags tags={post.tags} />

        <time class="text-gray-500">{dateLong(post.publishedAt)}</time>

        <div
          class="mt-8 markdown-body"
          dangerouslySetInnerHTML={{ __html: render(post.content) }}
        />
      </div>

      <PostComments />
    </Layout>
  </>
);
