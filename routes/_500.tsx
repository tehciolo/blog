import { ErrorPageProps } from "$fresh/server.ts";
import { Layout } from "@/components/Layout.tsx";

export default function Error500Page({ error }: ErrorPageProps) {
  return (
    <Layout>
      <div class="py-8">
        <h1 class="text-5xl font-bold mb-8">500</h1>
        <p>Internal error: {(error as Error).message}</p>
      </div>
    </Layout>
  );
}
