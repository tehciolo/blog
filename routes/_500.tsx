import { Head } from "$fresh/runtime.ts";
import { Layout } from "@/components/Layout.tsx";

export default function Error500() {
  return (
    <>
      <Head>
        <title>500 - Internal error</title>
      </Head>

      <Layout>
        <h1 class="text-4xl font-bold">500 - Internal error</h1>
        <a href="/" class="underline">Go back home</a>
      </Layout>
    </>
  );
}
