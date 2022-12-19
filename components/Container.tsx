import { ComponentChildren } from "preact";

export default function Layout(props: { children: ComponentChildren }) {
  const { children } = props;
  return (
    <div class="max-w-screen-md px-4 mx-auto">
      {children}
    </div>
  );
}
