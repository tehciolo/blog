import { Handlers, PageProps } from "$fresh/server.ts";
import { getAllTags, Post, readAllPosts } from "@/utils/posts.ts";
import { Layout } from "@/components/Layout.tsx";
import { Head } from "$fresh/runtime.ts";
import { PostCard, PostTags } from "@/components/post/index.ts";
import { CommonHead } from "@/components/CommonHead.tsx";

export const handler: Handlers<Post[]> = {
  GET(_req, ctx) {
    return readAllPosts({})
      .then(ctx.render);
  },
};

export default function BlogIndexPage({ data: posts }: PageProps<Post[]>) {
  const uniqueTags = Array.from(
    new Set(
      getAllTags(posts),
    ),
  );

  return (
    <>
      <Head>
        <CommonHead />
        <title>Cosmin Cioacla's blog</title>
        <meta name="title" content="Cosmin Cioacla's blog" />
        <meta
          name="description"
          content="A blog about learning. Mostly Web Development."
        />
      </Head>

      <Layout>
        <div class="py-8">
          <h1 class="text-5xl font-bold sr-only">Blog</h1>
          <section class="mb-8">
            <h2 class="mb-2 sr-only">Posts</h2>
            {posts.map((post) => <PostCard post={post} />)}
          </section>
          <section>
            <h2 class="text-xl mb-4">Tag cloud</h2>
            <PostTags tags={uniqueTags} />
          </section>
        </div>
      </Layout>
    </>
  );
}
