import { useEffect, useState } from "react";

const SHEET_ID = "1qw7CDg8LIp3c-NzvlmHx1BPJnZdJp90OLbakan7bk-M";
const LEADERSHIP_GID = "1214747113";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${LEADERSHIP_GID}`;

export interface LeadershipMember {
  name: string;
  role: string;
  initials: string;
  from: string;
  to: string;
}

const ROLE_COLORS: Record<string, { from: string; to: string }> = {
  "president":       { from: "#3b82f6", to: "#1d4ed8" },
  "vice president":  { from: "#10b981", to: "#047857" },
  "secretary":       { from: "#8b5cf6", to: "#6d28d9" },
  "treasurer":       { from: "#f59e0b", to: "#b45309" },
  "officer":         { from: "#06b6d4", to: "#0e7490" },
};

const FALLBACK_COLORS = [
  { from: "#3b82f6", to: "#1d4ed8" },
  { from: "#10b981", to: "#047857" },
  { from: "#8b5cf6", to: "#6d28d9" },
  { from: "#f59e0b", to: "#b45309" },
  { from: "#06b6d4", to: "#0e7490" },
  { from: "#ef4444", to: "#b91c1c" },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function getColors(role: string, index: number): { from: string; to: string } {
  const key = role.toLowerCase().trim();
  return ROLE_COLORS[key] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

export function useLeadership() {
  const [members, setMembers] = useState<LeadershipMember[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchLeadership() {
      try {
        const res = await fetch(CSV_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch leadership sheet");

        const text = await res.text();
        const rows = text.trim().split("\n");

        const parsed: LeadershipMember[] = rows
          .map((row, i) => {
            const cols = row.split(",").map((c) => c.replace(/^"|"$/g, "").trim());
            const name = cols[0];
            const role = cols[1] ?? "";
            if (!name) return null;
            const colors = getColors(role, i);
            return { name, role, initials: getInitials(name), ...colors };
          })
          .filter(Boolean) as LeadershipMember[];

        if (!cancelled && parsed.length > 0) setMembers(parsed);
      } catch {
        // keep existing data on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLeadership();
    const interval = setInterval(fetchLeadership, 5 * 60 * 1000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  return { members, loading };
}
