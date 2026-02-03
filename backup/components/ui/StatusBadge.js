// components/ui/StatusBadge.js
export const StatusBadge = ({ status }) => (
    <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        <span className="text-xs text-emerald-600 font-medium">{status}</span>
    </div>
);