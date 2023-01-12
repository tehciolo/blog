import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { CSS, render } from "$gfm";
import { Head } from "$fresh/runtime.ts";
import Layout from "@/components/Layout.tsx";

import "https://esm.sh/prismjs@1.27.0/components/prism-typescript?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-jsx?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-tsx?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-yaml?no-check";
import PostTags from "@/components/PostTags.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();

    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const { data: post, url } = props;
  const publishedTime = post.publishedAt.toISOString();

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <link rel="stylesheet" href="/app.css" />

        <title>{post.title}</title>
        <meta name="title" content={post.title} />
        <meta name="description" content={post.snippet} />
        <meta property="article:published_time" content={publishedTime} />
        <meta property="article:author" content="Cosmin Cioacla" />
        <meta property="article:section" content="Web Development" />
        <meta property="article:tag" content={post.tags?.join(", ")} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${url.origin}/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.snippet} />
        <meta property="og:image" content={`${url.origin}/hero.jpg`} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${url.origin}/${post.slug}`} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.snippet} />
        <meta property="twitter:image" content={`${url.origin}/hero.jpg`} />
      </Head>
      <Layout>
        <div class="py-8">
          <h1 class="text-5xl font-bold mb-2">{post.title}</h1>
          <PostTags tags={post.tags} />
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

        <script
          src="https://utteranc.es/client.js"
          repo="tehciolo/blog"
          issue-term="pathname"
          label="utterances"
          theme="github-light"
          crossorigin="anonymous"
          async
        >
        </script>
      </Layout>
    </>
  );
}
