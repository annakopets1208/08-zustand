import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

interface NotePageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");
  return {
    title: `${slug[0]} notes`,
    description: `Notes filtered by tag "${slug[0]}"`,
    openGraph: {
      title: `${slug[0]} notes`,
      description: `Notes filtered by tag "${slug[0]}"`,
      url: `https://07-routing-nextjs-rust-nu.vercel.app/notes/filter/${slugPath}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Filtered Notes",
        },
      ],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  await queryClient.prefetchQuery({
    queryKey: ["notes", slug[0]],
    queryFn: () => fetchNotes("", undefined, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={slug[0]} />
    </HydrationBoundary>
  );
}
