/**
 * Utility functions for importing and exporting data as CSV
 */

export function exportToCSV<T extends object>(data: T[], fileName: string) {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) => {
    return Object.values(row)
      .map((value) => {
        const escaped = String(value).replace(/"/g, '""');
        return `"${escaped}"`;
      })
      .join(",");
  });

  const csvContent = [headers, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function parseCSV(csvText: string): any[] {
  const lines = csvText.split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ''));
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(",").map(v => v.trim().replace(/"/g, ''));
    const obj: any = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index] || "";
    });
    
    data.push(obj);
  }

  return data;
}
