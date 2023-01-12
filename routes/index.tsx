import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post, Tag } from "@/utils/posts.ts";
import Layout from "@/components/Layout.tsx";
import { Head } from "$fresh/runtime.ts";
import PostCard from "@/components/PostCard.tsx";
import PostTags from "@/components/PostTags.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts({});
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;

  const tags = posts.reduce((tags, post) => {
    return post.tags ? tags.concat(post.tags) : tags;
  }, [] as Tag[]);

  const uniqueTags = Array.from(new Set(tags));

  return (
    <>
      <Head>
        <title>Cosmin Cioacla's blog</title>
        <meta name="title" content="Cosmin Cioacla's blog" />
        <meta
          name="description"
          content="A blog about learning. Mostly Web Development."
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
