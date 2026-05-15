export const timeLeft = (expiresAt) => {
  if (!expiresAt) return null;

  const diff =
    new Date(expiresAt) - new Date();

  if (diff < 0) return "Ended";

  const d = Math.floor(diff / 86400000);

  const h = Math.floor(
    (diff % 86400000) / 3600000
  );

  return d > 0
    ? `${d}d ${h}h`
    : `${h}h`;
};

export const STATUS = {
  active: {
    label: "Active",
    dot: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.2)",
    text: "#22c55e",
  },

  closed: {
    label: "Closed",
    dot: "#57534e",
    bg: "rgba(87,83,78,0.15)",
    border: "rgba(87,83,78,0.25)",
    text: "#78716c",
  },

  draft: {
    label: "Draft",
    dot: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    text: "#f59e0b",
  },
};