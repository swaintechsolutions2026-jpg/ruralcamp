import { createFileRoute, notFound } from "@tanstack/react-router";
import { STAYS } from "@/lib/catalog";
import { ProductDetail } from "@/components/site/ProductDetail";

export const Route = createFileRoute("/camping/$slug")({
  loader: ({ params }) => {
    const p = STAYS.find((t) => t.slug === params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const t = loaderData && STAYS.find((x) => x.slug === loaderData.slug);
    if (!t) return { meta: [{ title: "Stay not found — Rural Camps" }, { name: "robots", content: "noindex" }] };
    const title = `${t.title} — ${t.location} | Rural Camps`;
    return { meta: [{ title }, { name: "description", content: t.summary }, { property: "og:title", content: title }, { property: "og:description", content: t.summary }] };
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  return <ProductDetail product={STAYS.find((t) => t.slug === slug)!} />;
}
