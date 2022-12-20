import { ComponentChildren } from "preact";
import Container from "./Container.tsx";

export default function Layout(props: { children: ComponentChildren }) {
  const { children } = props;
  return (
    <div class="grid grid-cols-1 grid-rows-holy h-screen">
      <header class="py-4">
        <Container>
          <a class="text-xl font-mono font-bold text-[#0969da]" href="/">
            [].blog()
          </a>
        </Container>
      </header>
      <main>
        <Container>{children}</Container>
      </main>
      <footer class="py-4">
        <Container>
          <p class="text-center">
            © Cosmin Cioaclă 2022{" "}
            <img
              class="inline align-middle"
              src="/fresh-logo.svg"
              width="20px"
              height="20px"
              alt="the fresh logo: a sliced lemon dripping with juice"
            />{" "}
            Freshly squeezed by a Denosaur{" "}
            <img
              class="inline align-middle"
              src="/deno-logo.svg"
              width="20px"
              height="20px"
              alt="the deno logo: a dinosaur head in the rain"
            />
          </p>
        </Container>
      </footer>
    </div>
  );
}
