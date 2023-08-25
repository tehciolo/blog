import { UnknownPageProps } from "$fresh/server.ts";
import { Layout } from "@/components/Layout.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <Layout>
      <div class="py-8">
        <h1 class="text-5xl font-bold mb-8">404</h1>
        <p>Not found: {url.pathname}</p>
      </div>
    </Layout>
  );
}
