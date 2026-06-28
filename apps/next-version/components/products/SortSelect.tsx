//sort dropdown - updates the sort URL param to re-fetch products server-side
"use client";
import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low", value: "price_asc" },
  { label: "Price: High", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
];

export default function SortSelect({ current }: { current?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", e.target.value);
    }
    router.replace(`/catalogue?${params.toString()}`);
  }
  return (
    <select
      defaultValue={current ?? "newest"}
      onChange={handleChange}
      className="text-[13px] border border-slate-200 rounded-lg px-3 py-2
                 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300
                 bg-white cursor-pointer"
    >
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
