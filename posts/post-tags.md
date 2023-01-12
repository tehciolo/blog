---
title: Blog Post tagging system
published_at: 2023-01-12T17:26:51.245Z
snippet: Tags are a great way to add extra information to blog posts.
tags: ['tailwind', 'blog', 'a11y']
---

Tags are a great way to add extra information to blog posts. Let's try to
achieve the following:

- Allow for post tagging + display tags on post page
- Clicking on a tag will show a page with posts with that tag
- Aggregate all tags and display them on the index page in a tag cloud

[Here](https://github.com/tehciolo/blog/tree/59fbc784ddf6a55a4f8e74bfc254aa101f2238c9)'s
the starting point for this endeavour.

## Post tagging

[YAML](https://en.wikipedia.org/wiki/YAML) is often prepended to markdown files
to provide structured metadata. This blog uses this in order to store the post
title, publish date and a snippet. This looks like a good place to also store
the tags.

```yaml
title: Holy Grail Layout using CSS Grid via Tailwind
published_at: 2022-12-18T17:16:15.329Z
snippet: Add a layout to the blog post page.
tags: ['css-grid', 'tailwind', 'blog'] # Look, ma! Tagsies
```

Let's create a new component that will output the tags below the post title:

```tsx
// components/PostTags.tsx
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
```

We're beginning to see the power of Tailwind here. With just a few fairly
readable classes, we have built some lovely tag "pills".

Let's now use the component in the Blog Post page:

```tsx
// routes/[slug].tsx

{/* ... */}
<Layout>
  <div class="py-8">
    <h1 class="text-5xl font-bold mb-2">{post.title}</h1>
    <PostTags tags={post.tags} />
    {/* content */}
  </div>
</Layout>;
{/* ... */}
```

![Post top section featuring tags](/post-tags.png)

As a small aside, I chose the colors by stumbling upon `bg-indigo` in the
[Tailwind CSS docs](https://tailwindcss.com/docs/background-color#setting-the-background-color)
and figuring out an accessible text color using
[Accessible Colors](https://accessible-colors.com/).

## Tag page

The tag page will look very similar to the Blog Index, but I do want to keep
them separate.

```tsx
// routes/tag/[slug].tsx
export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts({ tag: ctx.params.slug });
    if (posts.length === 0) return ctx.renderNotFound();

    return ctx.render(posts);
  },
};
```

The `getPosts` function now accepts a `tag` in an options parameter. Here is how
we are using that:

```ts
// utils/posts.ts
export async function getPosts({ tag }: { tag?: string }): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises: Promise<Post | null>[] = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = (await Promise.all(promises)).filter(isPost);
  posts
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return tag ? posts.filter((post) => post.tags?.includes(tag)) : posts;
}
```

If we pass a `tag` when calling the function, the posts returned will be
filtered so only posts with that tag are returned.

And here is the relevant part of the page component:

```tsx
// routes/tag/[slug].tsx

{/* ... */}
<Layout>
  <div class="py-8">
    <h1 class="text-5xl font-bold mb-2">#{props.params.slug}</h1>
    <div>
      {posts.map((post) => <PostCard post={post} />)}
    </div>
  </div>
</Layout>;
{/* ... */}
```

![Tag page](/tag-page.png)

#exciting

## Index tag cloud

We already built the `PostTags` component earlier, so this is a perfect case to
employ **reusability**. Let's add it to the Index page below the list of posts.
We feed `uniqueTags` into it, which is a list of all the tags of all the posts,
from which we remove duplicates using the old `Array` + `Set` dance off.

```tsx
// index.tsx

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;

  const tags = posts.reduce((tags, post) => {
    return post.tags ? tags.concat(post.tags) : tags;
  }, [] as Tag[]);

  const uniqueTags = Array.from(new Set(tags)); // DANCE!

  return (
    <>
      {/* ... */}
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
```

![Blog Index tag cloud](/tag-cloud.png)

Yes, this approach does not scale that well. If we have 200 tags, we show 200
tags in the tag cloud. This could be improved. On the other hand, the Blog Index
has no pagination. We just show _all_ the posts. I will tackle these when they
actually become problems.
[#under-engineering](https://en.wikipedia.org/wiki/Overengineering)

## Bonus round

In [my previous post](/meta-tags), I left a `<meta>` tag commented out. It was
related to article tags. Let's quckly fix that:

```tsx
// routes/[slug.tsx]

<Head>
  {/* ... */}
  <meta property="article:tag" content={post.tags?.join(", ")} />
  {/* ... */}
</Head>;
```

## Wrapping up

When
[Twitter goes down](https://mashable.com/article/twitter-down-elon-says-works-fine),
you can (now) come to my Blog for your hashtag fix.
