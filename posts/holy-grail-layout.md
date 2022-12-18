---
title: Holy Grail Layout using CSS Grid via Tailwind
published_at: 2022-12-18T17:16:15.329Z
snippet: Add a layout to the blog post page.
---

We are going a bit meta today and will be working on _this_ blog. I used
[this lovely tutorial](https://deno.com/blog/build-a-blog-with-fresh) to set it
up. It is powered by [Fresh](https://fresh.deno.dev/), a new framework from the
[Deno](https://deno.land/) folks. You can check the source code
[here](https://github.com/tehciolo/blog/tree/1ba5b3b281c7933e36da05258fe84442c3c2ceab).

Let's look at the blog post page:

![Initial commit(ment) screenshot](/blog-post-initial.png)

You might be thinking: "But Cosmin, this looks so slick and minimal. I love
it!". That's obviously the case, but at the same time it's also just rendered
Markdown, and a blog needs a bit more than that. Namely, let's add a layout with
a `<header>` and `<footer>`.

We're going to create a new file, `components/Layout.tsx`:

```tsx
import { ComponentChildren } from "preact";

export default function Layout(props: { children: ComponentChildren }) {
  const { children } = props;
  return (
    <div>
      <header>header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  );
}
```

We already have a `max-width` container on the blog post content, but we are
going to need this for the `<header>` and `<footer>` as well. Let's create
`components/Container.tsx`:

```tsx
import { ComponentChildren } from "preact";

export default function Layout(props: { children: ComponentChildren }) {
  const { children } = props;
  return (
    <div class="max-w-screen-md px-4 mx-auto">
      {children}
    </div>
  );
}
```

We can now use this in `Layout`:

```tsx
import { ComponentChildren } from "preact";
import Container from "./Container.tsx";

export default function Layout(props: { children: ComponentChildren }) {
  const { children } = props;
  return (
    <div>
      <header>
        <Container>header</Container>
      </header>
      <main>
        <Container>{children}</Container>
      </main>
      <footer>
        <Container>footer</Container>
      </footer>
    </div>
  );
}
```

This allows us to have the full-width page sections, but with the content
restricted to the `Container`. This brings flexibility in terms of styling.

Let's also tidy up the blog post page (`[slug].tsx`):

```tsx
export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <Layout>
        <div class="py-8"> <!-- We only need some vertical padding here now -->
          <h1 class="text-5xl font-bold">{post.title}</h1>
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
      </Layout>
    </>
  );
}
```

Sooo... let's get to the Holy Grail thing. For those of you who don't know what
I'm talking about, The Holy Grail Layout looks something like this:

![Holy Grail Layout](/holy-grail-layout.png)

The aim is to have a header, a main content area (with fixed-width sidebar on
the left, content in the middle and a fixed-width sidebar on the right) and a
footer. If there is not enough content in the main content area, this should
extend so that the footer sticks to the bottom of the page.

While I do believe this could be useful for the blog in the future, what I need
right now is everything except for the sidebars.

Doesn't that mean we just need a sticky footer? Well, yes. However, that title
would not bring me a gazillion readers. Also, we will be building this so that
we can easily extend it later to add the sidebars.

Everything we want to achieve here can be done with a CSS rule like the
following:

```css
/* equivalent Tailwind utility classes in comments below, next to declarations */
.holy-grail {
  display: grid; /* grid */
  grid-template-rows: auto 1fr auto; /* ? */
  height: 100vh; /* h-screen */
}
```

Tailwind has nice
[CSS Grid utilities](https://tailwindcss.com/docs/grid-template-rows), but what
we need for the rows is not baked in. There are multiple ways to solve this, but
let's do this via `tailwind.config.ts` (`twind.config.ts` in Fresh):

```ts
import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,

  theme: {
    extend: {
      gridTemplateRows: {
        "holy": "auto 1fr auto", // -> utility class `grid-rows-holy`
      },
    },
  },
} as Options;
```

We can now apply all needed classes to the root of our layout:

```tsx
// Layout.tsx
return (
  <div class="grid grid-rows-holy h-screen">
    <header>
      <Container>header</Container>
    </header>
    <main>
      <Container>{children}</Container>
    </main>
    <footer>
      <Container>footer</Container>
    </footer>
  </div>
);
```

After adding some appropriate content for the header and the footer, we end up
with:

![Initial commit(ment) screenshot](/blog-post-final.png)

Success!
