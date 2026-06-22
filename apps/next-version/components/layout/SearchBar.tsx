//autocomplete search bar - shows a dropdown of matching products as the user types
//uses debounce to acoid making a resquest on every single keystroke
"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import { Input } from "@/components/ui/input";
//types
interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}
//component
export default function SearchBar() {
  const router = useRouter();
  //raw input value - updates on every keystroke
  const [query, setQuery] = useState("");
  //Debounced value - only updates 300ms after the user stops typing
  //this prevents sending a request on every single keystroke
  const [debouncedQuery] = useDebounce(query, 300);
  //search results from API
  const [results, setResults] = useState<Product[]>([]);
  //controls dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  //loading state while fetching
  const [isLoading, setIsLoading] = useState(false);
  //ref to the wrapper div - to detect clicks outside and close dropdown
  const wrapperRef = useRef<HTMLDivElement>(null);
  //fetch results when debounced query changes
  useEffect(() => {
    async function fetchResults() {
      if (!debouncedQuery?.trim()) {
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch(
          `/api/products?search=${encodeURIComponent(debouncedQuery)}`,
        );

        const data = await res.json();

        setResults(data.slice(0, 6));
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [debouncedQuery]);
  //close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  //handle result click
  function handleSelect(product: Product) {
    //navigate to the product detal page
    router.push(`/products/${product.id}`);
    //clear search and close dropdown
    setQuery("");
    setIsOpen(false);
  }
  return (
    // Wrapper with relative positioning so dropdown is positioned below the input
    <div ref={wrapperRef} className="relative flex-1 max-w-2xl">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Search size={16} />
        )}
      </div>

      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setIsOpen(true)}
        placeholder="Search products..."
        className="pl-9 bg-blue-50 border-blue-100 focus-visible:ring-blue-300"
      />

      {isOpen && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl
                        border border-blue-100 shadow-lg overflow-hidden z-50"
        >
          {results.map((product, index) => (
            <button
              key={product.id}
              onClick={() => handleSelect(product)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left
                         hover:bg-blue-50 transition-colors
                         ${index !== results.length - 1 ? "border-b border-blue-50" : ""}`}
            >
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-blue-50 shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                {/* line-clamp-1 prevents long titles from breaking layout */}
                <span className="text-[13px] font-medium text-slate-800 line-clamp-1">
                  {product.title}
                </span>
                <span className="text-[12px] text-blue-600 font-medium">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </button>
          ))}

          <button
            onClick={() => {
              router.push(`/?search=${encodeURIComponent(query)}`);
              setIsOpen(false);
            }}
            className="w-full px-3 py-2.5 text-[13px] text-blue-600 font-medium
                       hover:bg-blue-50 transition-colors text-center border-t border-blue-50"
          >
            {'View all results for "' + query + '"'}
          </button>
        </div>
      )}

      {isOpen &&
        !isLoading &&
        results.length === 0 &&
        debouncedQuery.length > 0 && (
          <div
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl
                        border border-blue-100 shadow-lg z-50 px-3 py-4 text-center"
          >
            <p className="text-[13px] text-slate-400">
              {'No products found for "' + debouncedQuery + '"'}
            </p>
          </div>
        )}
    </div>
  );
}
