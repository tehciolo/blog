import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/utils/posts.ts";
import Layout from "@/components/Layout.tsx";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
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
          <h1 class="text-5xl font-bold">Blog</h1>
          <div class="mt-8">
            {posts.map((post) => <PostCard post={post} />)}
          </div>
        </div>
      </Layout>
    </>
  );
}

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <div class="py-8 border(t gray-200)">
      <a class="sm:col-span-2" href={`/${post.slug}`}>
        <h3 class="text(3xl gray-900) font-bold">
          {post.title}
        </h3>
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div class="mt-4 text-gray-900">
          {post.snippet}
        </div>
      </a>
    </div>
  );
}
