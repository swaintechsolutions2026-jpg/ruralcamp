import { createFileRoute, notFound } from "@tanstack/react-router";
import { PRIVATE_TOURS } from "@/lib/catalog";
import { ProductDetail } from "@/components/site/ProductDetail";

export const Route = createFileRoute("/private-tours/$slug")({
  loader: ({ params }) => {
    const p = PRIVATE_TOURS.find((t) => t.slug === params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const t = loaderData && PRIVATE_TOURS.find((x) => x.slug === loaderData.slug);
    if (!t) return { meta: [{ title: "Tour not found — Rural Camps" }, { name: "robots", content: "noindex" }] };
    const title = `${t.title} — Rural Camps`;
    return { meta: [{ title }, { name: "description", content: t.summary }, { property: "og:title", content: title }, { property: "og:description", content: t.summary }] };
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  return <ProductDetail product={PRIVATE_TOURS.find((t) => t.slug === slug)!} />;
}
