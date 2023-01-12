import { Post } from "@/utils/posts.ts";

export default function PostTags({ tags }: { tags: Post["tags"] }) {
  return (
    <ul class="list-none mb-2">
      {tags?.map((tag) => (
        <li class="inline-block">
          <a
            href={`/tag/${tag}`}
            class="inline-block bg-indigo-300 text-[#494949] mr-1 px-4 py-1 rounded-full"
          >
            #{tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
