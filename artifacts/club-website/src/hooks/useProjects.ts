import { useEffect, useState } from "react";

const SHEET_ID = "1qw7CDg8LIp3c-NzvlmHx1BPJnZdJp90OLbakan7bk-M";
const PROJECTS_GID = "842576734";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${PROJECTS_GID}`;

export interface Project {
  creator: string;
  link: string;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      try {
        const res = await fetch(CSV_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch projects sheet");

        const text = await res.text();
        const rows = text.trim().split("\n");

        const parsed: Project[] = rows
          .map((row) => {
            const cols = row.split(",").map((c) => c.replace(/^"|"$/g, "").trim());
            const creator = cols[0];
            const link = cols[1] ?? "";
            if (!creator) return null;
            return { creator, link };
          })
          .filter(Boolean) as Project[];

        if (!cancelled) setProjects(parsed);
      } catch {
        // keep existing data on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProjects();
    return () => { cancelled = true; };
  }, []);

  return { projects, loading };
}
