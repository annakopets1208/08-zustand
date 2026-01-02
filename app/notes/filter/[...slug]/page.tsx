import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import App from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

interface NotePageProps {
  params: { slug: string[] };
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const filterName = params.slug.join(" / ");
  const title = `Notes: ${filterName}`;
  const description = `Browse posts filtered by category: ${filterName}.`;
  const url = `https://yourdomain.com/notes/filter/${params.slug.join("/")}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Image for filter ${filterName}`,
        },
      ],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, searchValue: "", tag }],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <App tag={tag ?? "all"} />
    </HydrationBoundary>
  );
}
