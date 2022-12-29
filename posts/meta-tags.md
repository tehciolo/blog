---
title: Blog visibility and coat of paint
published_at: 2022-12-29T10:11:48.346Z
snippet: Add meta tags for Search Engine Optimization (SEO) and rich link previews support.
---

In an effort to one-up [my last post](/holy-grail-layout)'s intro, let's go **a
lot meta**! In addition to working on _this_ blog again, we will also be working
with `<meta>` tags. Starting point source code can be found
[here](https://github.com/tehciolo/blog/tree/efae8691c4cfe6199a3502397634e945cf91f115).

We currently have a grand total of **2** `<meta>` tags on the blog post page:

```html
<meta charSet="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

The first
**[has](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset)**
to be there, and the second is a must if you care about the UI being responsive
to different viewport sizes. We can do better!

Two quick wins would be to add some meta tags for SEO purposes (Hi, dear
reader!), and for rich link previews. If you would like to find out more about
the why and how, [this](https://metatags.io/) is a good resource.

We need to add basic (mostly for search engines), open graph (Facebook,
Pinterest, LinkedIn, etc.) and twitter (Twitter 🤯) related meta tags. A lot of
the content will be duplicated. Yay standards!

Here are the tags we need for this post (generated by the resource mentioned
above):

```html
<!-- Primary Meta Tags -->
<title>Blog visibility and coat of paint</title>
<meta name="title" content="Blog visibility and coat of paint">
<meta name="description" content="Add meta tags for Search Engine Optimization (SEO) and rich link previews support.">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://cosmincioacla.blog/meta-tags">
<meta property="og:title" content="Blog visibility and coat of paint">
<meta property="og:description" content="Add meta tags for Search Engine Optimization (SEO) and rich link previews support.">
<meta property="og:image" content="https://cosmincioacla.blog/hero.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://cosmincioacla.blog/meta-tags">
<meta property="twitter:title" content="Blog visibility and coat of paint">
<meta property="twitter:description" content="Add meta tags for Search Engine Optimization (SEO) and rich link previews support.">
<meta property="twitter:image" content="https://cosmincioacla.blog/hero.jpg">
```

Additionally, if we change `og:type` to be `article` instead of `website`, we
cand add some more meta information according to the
[Open Graph Protocol](https://ogp.me/#type_article).

```html
<meta property="article:published_time" content="TBD"/>
<meta property="article:author" content="Cosmin Cioacla"/>
<meta property="article:section" content="Web Development"/>
<meta property="article:tag" content="html"/>
```

Putting everything together in the blog post page:

```tsx
<Head>
  <style dangerouslySetInnerHTML={{ __html: CSS }} />
  <link rel="stylesheet" href="/app.css" />

  <title>{post.title}</title>
  <meta name="title" content={post.title} />
  <meta name="description" content={post.snippet} />
  <meta property="article:published_time" content={publishedTime} />
  <meta property="article:author" content="Cosmin Cioacla" />
  <meta property="article:section" content="Web Development" />
  {/* <meta property="article:tag" content="" /> */}

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
</Head>;
```

I added a generic image to the `/static` folder (called `hero.jpg` above). Maybe
at some point in the future, the blog will support individual images per blog
post.

I commented out the article tags for now, but I will tackle this in my next blog
post where we will add a tagging system to the blog.

Here's a sneak peek of the results:

![Blog Post link preview](/meta-tags.png)

Yes. That's my face.