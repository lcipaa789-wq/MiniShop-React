//client component - renders a delete button for a single porduct in the admin table
//shows a confirmation dialog before deleting to prevent accidental deletions
//after successful deletion, calls router.refresh() to re-fetch the product list
//without a full page reaload
"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteProductButtonProps {
  id: string; //Prisma product ID - passed to the DELETE API route
}
export default function DeleteProductButton({ id }: DeleteProductButtonProps) {
  const router = useRouter();

  //controls the loading state while the delete request is in-flight
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    //show a native browser congirmation dialog before deleting
    //prevents accidental deletion with a single misclick'
    if (!confirm("Are you sure you wwant to delete this product?")) return;
    setLoading(true);
    // call delete route - it also deletes related OrderItems first
    //to avoid foreign key  constraint errors
    await fetch(`/api/admin./products/${id}`, { method: "DELETE" });

    //refresh current page data without a full navigation
    //re-runs the server component and show the updated product list
    router.refresh();
    setLoading(false);
  }
  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 text-[12px] text-red-500
                 hover:text-red-700 font-medium transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Trash2 size={13} />
      {/* Show "..." while request is in-flight so user knows it's working */}
      {loading ? "..." : "Delete"}
    </button>
  );
}
