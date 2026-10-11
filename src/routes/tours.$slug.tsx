import { createFileRoute, notFound } from "@tanstack/react-router";
import { GROUP_TOURS } from "@/lib/catalog";
import { ProductDetail } from "@/components/site/ProductDetail";

export const Route = createFileRoute("/tours/$slug")({
  loader: ({ params }) => {
    const tour = GROUP_TOURS.find((t) => t.slug === params.slug);
    if (!tour) throw notFound();
    return { slug: tour.slug };
  },
  head: ({ loaderData }) => {
    const t = loaderData && GROUP_TOURS.find((x) => x.slug === loaderData.slug);
    if (!t) return { meta: [{ title: "Tour not found — Rural Camps" }, { name: "robots", content: "noindex" }] };
    const title = `${t.title} · ${t.dateLabel} — Rural Camps`;
    return { meta: [{ title }, { name: "description", content: t.summary }, { property: "og:title", content: title }, { property: "og:description", content: t.summary }] };
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  return <ProductDetail product={GROUP_TOURS.find((t) => t.slug === slug)!} />;
}
