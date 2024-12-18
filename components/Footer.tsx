import { Container } from "@/components/Container.tsx";

export const Footer = () => (
  <footer class="py-4">
    <Container>
      <p class="text-center">
        © Cosmin Cioaclă 2022 - 2024{" "}
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
);
