import { notFound } from "next/navigation";
import TrackPageClient from "./track-client";

const FACULTIES = {
  it: {
    title: "IT & Computer Science",
    tracks: {
      cs: { title: "Computer Science" },
      "information-technology": { title: "Information Technology" },
      "software-engineering": { title: "Software Engineering" },
      "data-science": { title: "Data Science" },
      "artificial-intelligence": { title: "Artificial Intelligence" },
      cybersecurity: { title: "Cybersecurity" },
    },
  },
} as const;

type PageProps = {
  params: Promise<{
    faculty: string;
    track: string;
  }>;
};

export default async function TrackPage({ params }: PageProps) {
  const { faculty, track } = await params;

  const facultyData = FACULTIES[faculty as keyof typeof FACULTIES];
  if (!facultyData) return notFound();

  const trackData =
    facultyData.tracks[track as keyof typeof facultyData.tracks];
  if (!trackData) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-white">
      <TrackPageClient
        faculty={faculty}
        track={track}
        trackTitle={trackData.title}
      />
    </main>
  );
}
