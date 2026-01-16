// Icon Components for Course Meta

export const DurationIcon = ({ small }) => (
    <svg
        width={small ? "16" : "24"}
        height={small ? "16" : "24"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="12" cy="12" r="10" stroke="#3B432C" strokeWidth="1.5" />
        <path d="M12 6V12L16 14" stroke="#3B432C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const ModeIcon = ({ small }) => (
    <svg
        width={small ? "16" : "24"}
        height={small ? "16" : "24"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="#3B432C" strokeWidth="1.5" />
        <path d="M8 21H16" stroke="#3B432C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 18V21" stroke="#3B432C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const LocationIcon = ({ small }) => (
    <svg
        width={small ? "16" : "24"}
        height={small ? "16" : "24"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            stroke="#3B432C"
            strokeWidth="1.5"
        />
        <circle cx="12" cy="9" r="2.5" stroke="#3B432C" strokeWidth="1.5" />
    </svg>
);

export const CalendarIcon = ({ small }) => (
    <svg
        width={small ? "16" : "24"}
        height={small ? "16" : "24"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="#3B432C" strokeWidth="1.5" />
        <path d="M3 10H21" stroke="#3B432C" strokeWidth="1.5" />
        <path d="M8 2V6" stroke="#3B432C" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 2V6" stroke="#3B432C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
