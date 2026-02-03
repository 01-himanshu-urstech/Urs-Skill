"use client";

import { FileOutput, Plus } from "lucide-react";

export default function PageHeader({
    title,
    description,
    showExport = false,
    addButtonLabel,
    onAddClick,
    onExportClick
}) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
            {/* Title and Description */}
            <div className="space-y-1">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                    {title}
                </h1>
                {description && (
                    <p className="text-xs md:text-sm text-gray-500">
                        {description}
                    </p>
                )}
            </div>

            {/* Action Buttons Area */}
            <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
                {showExport && (
                    <button
                        onClick={onExportClick}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 border border-gray-200 bg-white rounded-lg text-xs md:text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm hover:cursor-pointer"
                    >
                        <FileOutput size={16} className="text-gray-400" />
                        <span className="whitespace-nowrap">Export</span>
                    </button>
                )}

                {addButtonLabel && (
                    <button
                        onClick={onAddClick}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-xs md:text-sm font-semibold hover:bg-[#5B21B6] transition-all shadow-sm shadow-purple-200 hover:cursor-pointer"
                    >
                        <Plus size={16} />
                        <span className="whitespace-nowrap">{addButtonLabel}</span>
                    </button>
                )}
            </div>
        </div>
    );
}