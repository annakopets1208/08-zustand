import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import App from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface NotePageProps {
  params: Promise<{ slug: string[] }>;
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
      <App initialTag={tag} />
    </HydrationBoundary>
  );
}
