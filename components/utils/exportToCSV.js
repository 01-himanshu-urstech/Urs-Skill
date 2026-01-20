// utils/exportToCSV.js
export const exportToCSV = (data, filename = "ledger_export") => {
    if (!data || !data.length) return alert("No data available to export");

    // Extract headers from the first object keys
    const headers = Object.keys(data[0]);

    // Create CSV rows
    const csvRows = [
        headers.join(','), // Header row
        ...data.map(row =>
            headers.map(fieldName => {
                let value = row[fieldName] ?? '';
                // Handle objects/arrays (like SEO or Metadata)
                if (typeof value === 'object') value = JSON.stringify(value).replace(/,/g, ';');
                // Escape quotes and wrap in quotes for safety
                return `"${String(value).replace(/"/g, '""')}"`;
            }).join(',')
        )
    ].join('\r\n');

    // Create a blob and download
    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};