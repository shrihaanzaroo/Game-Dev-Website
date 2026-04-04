import { useEffect, useState } from "react";

const SHEET_ID = "1qw7CDg8LIp3c-NzvlmHx1BPJnZdJp90OLbakan7bk-M";
// gid=0 is the Attendance tab (same sheet the user linked to)
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
const POLL_MS = 5 * 60 * 1000; // refresh every 5 minutes

function parseCell(text: string): string {
  return text.replace(/^"|"$/g, "").trim();
}

/** Reads cell C2 (row index 1, col index 2) from the CSV.
 *  Falls back to counting date-like column headers if C2 isn't a plain number. */
function extractMeetingCount(csv: string): number | null {
  const rows = csv.trim().split("\n");

  // --- Primary: C2 as a plain number ---
  if (rows.length >= 2) {
    const cols = rows[1].split(",");
    if (cols.length >= 3) {
      const c2 = parseCell(cols[2]);
      const n = Number(c2);
      if (!isNaN(n) && c2 !== "") return n;
    }
  }

  // --- Fallback: count date-looking columns in the header row ---
  // Header row is the one whose first cell is "Name"
  const DATE_RE = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
  for (const row of rows) {
    const cols = row.split(",").map(parseCell);
    if (cols[0].toLowerCase() === "name") {
      const dateCols = cols.slice(2).filter((c) => DATE_RE.test(c));
      return dateCols.length > 0 ? dateCols.length : null;
    }
  }

  return null;
}

export function useMeetingCount() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchCount() {
      try {
        const res = await fetch(CSV_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Sheet fetch failed");
        const text = await res.text();
        const n = extractMeetingCount(text);
        if (!cancelled) setCount(n);
      } catch {
        if (!cancelled) setCount(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCount();
    const interval = setInterval(fetchCount, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { count, loading };
}
