import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/utils/posts.ts";
import { Head } from "$fresh/runtime.ts";
import Layout from "@/components/Layout.tsx";
import PostCard from "@/components/PostCard.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts({ tag: ctx.params.slug });
    if (posts.length === 0) return ctx.renderNotFound();

    return ctx.render(posts);
  },
};

export default function TagPage(props: PageProps<Post[]>) {
  const { data: posts, url } = props;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/app.css" />

        <title>#{props.params.slug} - Cosmin Cioacla's blog</title>
        <meta
          name="title"
          content={`#${props.params.slug} - Cosmin Cioacla's blog`}
        />
        <meta
          name="description"
          content={`A blog about learning. Mostly Web Development. The ${props.params.slug} tag page.`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <Layout>
        <div class="py-8">
          <h1 class="text-5xl font-bold mb-2">#{props.params.slug}</h1>
          <div>
            {posts.map((post) => <PostCard post={post} />)}
          </div>
        </div>
      </Layout>
    </>
  );
}
