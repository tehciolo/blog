import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { CSS, render } from "$gfm";
import { Head } from "$fresh/runtime.ts";
import Layout from "@/components/Layout.tsx";

import "https://esm.sh/prismjs@1.27.0/components/prism-typescript?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-jsx?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-tsx?no-check";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <link rel="stylesheet" href="/app.css" />
      </Head>
      <Layout>
        <div class="py-8">
          <h1 class="text-5xl font-bold">{post.title}</h1>
          <time class="text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <div
            class="mt-8 markdown-body"
            dangerouslySetInnerHTML={{ __html: render(post.content) }}
          />
        </div>
      </Layout>
    </>
  );
}
