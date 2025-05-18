import { Head } from "$fresh/runtime.ts";
import { CSS } from "@deno/gfm";
import { Post } from "@/utils/posts.ts";
import { CommonHead } from "@/components/CommonHead.tsx";

type PostHeadProps = {
  post: Post;
  url: URL;
};

export const PostHead = ({ post, url }: PostHeadProps) => {
  const publishedTime = post.publishedAt.toISOString();

  return (
    <Head>
      <CommonHead />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
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
  );
};
