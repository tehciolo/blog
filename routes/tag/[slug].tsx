import { Handlers, PageProps } from "$fresh/server.ts";
import { Post, readAllPosts } from "@/utils/posts.ts";
import { Head } from "$fresh/runtime.ts";
import { Layout } from "@/components/Layout.tsx";
import { PostCard } from "@/components/post/index.ts";
import { CommonHead } from "@/components/CommonHead.tsx";

export const handler: Handlers<Post[]> = {
  GET(_req, ctx) {
    return readAllPosts({ tag: ctx.params.slug })
      .then((posts) =>
        posts.length === 0 ? ctx.renderNotFound() : ctx.render(posts)
      );
  },
};

export default function TagPage({ data: posts, params }: PageProps<Post[]>) {
  return (
    <>
      <Head>
        <CommonHead />

        <title>#{params.slug} - Cosmin Cioacla's blog</title>
        <meta
          name="title"
          content={`#${params.slug} - Cosmin Cioacla's blog`}
        />
        <meta
          name="description"
          content={`A blog about learning. Mostly Web Development. The ${params.slug} tag page.`}
        />
      </Head>

      <Layout>
        <div class="py-8">
          <h1 class="text-5xl font-bold mb-2">#{params.slug}</h1>
          <div>
            {posts.map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
        </div>
      </Layout>
    </>
  );
}
