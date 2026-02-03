// components/ui/ExportButton.js
"use client";
import { Download, Loader2 } from "lucide-react";
import { exportToCSV } from "../utils/exportToCSV";

export default function ExportButton({ data, filename, isLoading }) {
    return (
        <button
            onClick={() => exportToCSV(data, filename)}
            disabled={isLoading || !data?.length}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[10px]      uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <Loader2 size={14} className="animate-spin" />
            ) : (
                <Download size={14} />
            )}
            Export Records
        </button>
    );
}