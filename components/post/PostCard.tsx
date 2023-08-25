import { Post } from "@/utils/posts.ts";
import { dateLong } from "@/utils/formatting.ts";

export const PostCard = ({ post }: { post: Post }) => (
  <div class="py-8 border(b gray-200) last:border-none">
    <a class="sm:col-span-2" href={`/${post.slug}`}>
      <h3 class="text(3xl gray-900) font-bold">
        {post.title}
      </h3>

      <time class="text-gray-500">{dateLong(post.publishedAt)}</time>

      <div class="mt-4 text-gray-900">
        {post.snippet}
      </div>
    </a>
  </div>
);
