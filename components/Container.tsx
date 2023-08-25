import { ComponentChildren } from "preact";

export const Container = ({ children }: { children: ComponentChildren }) => (
  <div class="max-w-screen-md px-4 mx-auto">
    {children}
  </div>
);
