---
title: Maybe I hate `null`s?
published_at:
snippet: Handling nulls in JavaScript is a chore. Maybe there is a better way.
tags: ['javascript', 'typescript', 'functional']
---

I'm sorry. This is going to be a rather deep dive into the void.

_Note_: The following writings look at things from the perspective of the
JavaScript language (and its sister superset, TypeScript).

## The Billion Dollar Mistake

We can trace back the invention of the Null reference to Tony Hoare. I urge you
to at some point check out his
[lovely presentation](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/)
from QCon London 2009.

The short of it is that he calls it his "billion-dollar mistake".

The problem with the presentation is that it happened in 2009. This is
unfortunately after 1995, when Brendan Eich
[created JavaScript](https://thehistoryoftheweb.com/the-10-day-programming-language-is-a-myth/)
for Netscape.

JavaScript is, of course, not special. The most popular and most used languages
out there (Java, Python, C++, PHP, Go, Ruby) have `null` or a variation on it
(`nil`, `None`, `NULL` etc.).

However, languages like Rust, Haskell, F#, and Scala do without.

## `null` in JavaScript

JavaScript is a **beautiful** language.

Some of its appeal is due to its flexibility. You can usually achieve your goal
in a miriad of different ways.

So how about having 2 `null`s instead of 1. That will surely not complicate
things.

This "hold my beer" approach to language design blessed us with both `null` and
`undefined`.

I've been writing JavaScript for more than 15 years at this point, and my mental
model around the difference between the 2 has been that `null` means intention.
While researching this post, I've found that the model was fairly correct but
also incomplete. Let me explain.

### `undefined` means declared but unassigned

Here are the most common ways you will get an `undefined`:

- Variable declarations:
  ```js
  let myVariable;
  console.log(myVariable); // undefined
  ```
  We've declared `myVariable`, but have not yet assigned a value to it.
- Missing Object Properties:
  ```js
  const myObject = {
    name: "Alice",
  };
  console.log(myObject.age); // undefined
  ```
  Here we are trying to access an unassigned property on an object.
- Function parameters:
  ```js
  function greet(name) {
    console.log(name);
  }
  greet(); // undefined
  ```
  In the `greet` execution context, `name` will behave like in the first example
  (a `let name;` is implied). We are then trying to access the value, but as it
  was not assigned we get back undefined.
- Implicit `return`s:
  ```js
  function notQuiteAdd(a, b) {
    const sum = a + b;
    console.log(sum);
  }

  console.log(notQuiteAdd(6, 7)); // undefined
  ```
  If we do not explicitly `return` something from a function, we will implicitly
  `return undefined`.

The common link between them is that we don't need to assign the `undefined`
value somewhere, for JavaScript to hurl it at us.

This is, conceptually, different from...

### `null` means missing object

For a nice twist that I know will positively **hook** you, dear reader, I will
quote the [spec](https://262.ecma-international.org/#sec-null-value).

> 4.4.15 null value
>
> primitive value that represents the intentional absence of any object value

And the keyword there is `intentional`.

However, I was a bit surprised by the last part there. "any object value"?

I mean, ok. But this is not how I see it being used in the wild. In every single
codebase I've worked on, `null` is used where both object and primitive values
go.

You are welcome for some new ammunition in your pedantic PR comments.

If you see somebody putting a `null` where a primitive value should go, tell
them they are objectively (ha!) wrong.

Outline:

- nulls are not that great
- look at the creator of nulls, he says it's his billion dollar mistake
- in standard js fashion, it holds its beer
- and produces 2 nulls
- difference between null and undefined
  - if you have a null, you signify the intentional absence of ... an object.
    this is obvious if we look at `typeof null`. this legacy piece of javascript
    history is still in place, to not break the internet. but anyway, if you use
    `null` as a value instead of a primitive, you are **object**ively wrong.
    what can you do in this case? go grab a beer probably. it will `null`ify the
    peaks of the heightend emotions you are feeling.
  - how about `undefined`? well, it's there when you (or the JS engine)
    initialize (define) an `Identifier` but never end up giving it a value.
    think `let` or function arguments.
- post will refer to both as nulls henceforth. and here we will come across the
  only type coercion that almost everybody in javascript land agrees with.
  banana == null is equivalent to banana === null || banana === undefined.
- never liked/disliked nulls, but then started working with GraphQL
- WTF, crazy design choice. By default everything can be null. You need to opt
  out of something being null. Makes sense from the standpoint of being able to
  still return partial data instead of failing the query, BUT NOT FROM ANY OTHER
  STANDPOINT WTF. Thank you, oh great book of faces! Like `react` wasn't
  enough...
- examples of classic null checks
- what can we do to handle this better
- we want to be able to handle the null like it isn't there, kinda like when you
  map over an empty array and it does nothing. or like when you `.then`,
  `.then`, `.then`, and then (sic!) `.catch`. if the `.then` in the middle
  throws, we can pretend it didn't by adding a `.then` after it
- let's put a null inside a box
- enter Maybe
- yes, this is a functional programing blog post, SURPRISE
- it forces you to write more code, with the benefit of
  - always knowing what the fuck is going on
  - making you question if there really needs to be a null there
