import { useEffect, useState } from "react";

const SHEET_ID = "1qw7CDg8LIp3c-NzvlmHx1BPJnZdJp90OLbakan7bk-M";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

export function useMemberCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchCount() {
      try {
        const res = await fetch(CSV_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch sheet");

        const text = await res.text();
        const rows = text.trim().split("\n");

        // Find the header row index (contains "Name" as first cell)
        let headerIdx = -1;
        for (let i = 0; i < rows.length; i++) {
          const first = rows[i].split(",")[0].replace(/^"|"$/g, "").trim();
          if (first.toLowerCase() === "name") {
            headerIdx = i;
            break;
          }
        }

        if (headerIdx === -1) throw new Error("Header row not found");

        // Count non-empty rows after the header, excluding "(Home)" remote duplicates
        const memberRows = rows.slice(headerIdx + 1).filter((row) => {
          const first = row.split(",")[0].replace(/^"|"$/g, "").trim();
          return first.length > 0 && !first.toLowerCase().includes("(home)");
        });

        if (!cancelled) setCount(memberRows.length);
      } catch {
        // Fall back silently — stat will show the last known value
        if (!cancelled) setCount(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCount();
    return () => { cancelled = true; };
  }, []);

  return { count, loading };
}
