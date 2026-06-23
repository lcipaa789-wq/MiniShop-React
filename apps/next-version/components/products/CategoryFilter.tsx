// horizontal category filter bar — filters products by category.
// updates URL search params so ProductGrid re-fetches with filter.
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Laptop,
  Shirt,
  Home,
  Dumbbell,
  Sparkles,
  LayoutGrid,
} from "lucide-react";

//category config — label, icon, value
const categories = [
  { label: "All", value: "", icon: <LayoutGrid size={16} /> },
  { label: "Electronics", value: "ELECTRONICS", icon: <Laptop size={16} /> },
  { label: "Clothing", value: "CLOTHING", icon: <Shirt size={16} /> },
  { label: "Home", value: "HOME", icon: <Home size={16} /> },
  { label: "Sports", value: "SPORTS", icon: <Dumbbell size={16} /> },
  { label: "Beauty", value: "BEAUTY", icon: <Sparkles size={16} /> },
];

//Component
export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // get current active category from URL
  const activeCategory = searchParams.get("category") ?? "";

  // update URL with selected category — triggers ProductGrid re-fetch
  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.replace(`/?${params.toString()}`);
  }

  return (
    // horizontal scrollable row — works on mobile too
    <div
      className="flex items-center gap-2 px-4 py-3 overflow-x-auto
                    scrollbar-hide border-b border-blue-50"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => handleSelect(cat.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full
                       text-[13px] font-medium whitespace-nowrap transition-all
                       border cursor-pointer
                       ${
                         isActive
                           ? "bg-blue-600 text-white border-blue-600"
                           : "bg-white text-slate-600 border-blue-100 hover:border-blue-300 hover:text-blue-600"
                       }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
