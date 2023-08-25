import { ComponentChildren } from "preact";
import { Container } from "@/components/Container.tsx";
import { Header } from "@/components/Header.tsx";
import { Footer } from "@/components/Footer.tsx";

export const Layout = ({ children }: { children: ComponentChildren }) => {
  return (
    <div class="grid grid-cols-1 grid-rows-holy h-screen">
      <Header />

      <main>
        <Container>{children}</Container>
      </main>

      <Footer />
    </div>
  );
};
