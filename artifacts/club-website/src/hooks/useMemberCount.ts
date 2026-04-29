import { useEffect, useState } from "react";

const SHEET_ID = "1qw7CDg8LIp3c-NzvlmHx1BPJnZdJp90OLbakan7bk-M";
const MEMBERS_GID = "966741961";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${MEMBERS_GID}`;

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

        // Read cell D2 (row index 1, column index 3) — the member tally cell
        const row2 = rows[1]?.split(",") ?? [];
        const cellD2 = row2[3]?.replace(/^"|"$/g, "").trim();
        const tally = parseInt(cellD2, 10);

        if (!isNaN(tally) && !cancelled) setCount(tally);
      } catch {
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
