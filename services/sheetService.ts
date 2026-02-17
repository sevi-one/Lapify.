
import { Laptop } from '../types';

/**
 * Fetches data from a Google Sheet published to the web as CSV.
 * Maps columns to the Laptop interface, explicitly ignoring E, K, Q, V, Z, AC, AH.
 */
export async function fetchSheetData(sheetId: string, tabName: string): Promise<Laptop[]> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&sheet=${encodeURIComponent(tabName)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Sheet not accessible. Ensure it is published to the web.');
    }
    const csvText = await response.text();
    const data = parseCSV(csvText);
    if (data.length === 0) throw new Error('No data found in the sheet.');
    return data;
  } catch (error) {
    console.warn('Sync failed, using fallback data:', error);
    return getMockLaptops();
  }
}

function parseCSV(csv: string): Laptop[] {
  const lines = csv.split(/\r?\n/);
  if (lines.length < 2) return [];

  const splitCSVLine = (line: string) => {
    const result = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += char;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const results: Laptop[] = [];

  const parseNum = (val: string, isStorage = false): number => {
    if (!val) return 0;
    const clean = val.replace(/[$,\s]/g, '');
    let num = parseFloat(clean) || 0;
    
    if (isStorage && val.toLowerCase().includes('tb')) {
      num = num * 1024;
    }
    return num;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;
    
    let v = splitCSVLine(lines[i]);
    
    const firstCol = (v[0] || "").toLowerCase();
    const secondCol = (v[1] || "").toLowerCase();
    
    if (i === 0 && (firstCol === 'brand' || secondCol === 'model')) continue;
    if (firstCol.includes('laptops under') || firstCol === 'under') continue;
    
    // STRICT FILTER: Do not include 2 in 1 in the fetching
    const typeValue = v[3] || "";
    if (typeValue.toLowerCase().includes("2 in 1")) continue;

    if (v.length < 2 || !v[0] || !v[1]) continue;

    if (v.length < 38) {
      v = v.concat(Array(38 - v.length).fill(""));
    }

    const laptop: Laptop = {
      refId: `REF-${(i + 1).toString().padStart(3, '0')}`,
      brand: v[0],
      model: v[1],
      segment: v[2] || "General",
      type: v[3] || "SSD",
      sizeInches: parseNum(v[5]),
      pixels: v[6] || "1920x1080",
      refreshRate: parseNum(v[7]),
      panel: v[8] || "IPS",
      touch: (v[9] || "").toLowerCase() === "yes",
      
      cpuBrand: v[11] || "Unknown",
      cpuSeries: v[12] || "-",
      cores: parseNum(v[13]),
      multiThread: (v[14] || "").toLowerCase() === "yes",
      passmarkScore: parseNum(v[15]),
      
      gpuType: v[17] || "Integrated",
      gpuBrand: v[18] || "-",
      gpuModel: v[19] || "-",
      g3dMarkScore: v[20] || "0",
      
      ramGB: parseNum(v[22]),
      ramSpeed: v[23] || "-",
      solderedRAM: (v[24] || "").toLowerCase() === "yes",
      
      storageGB: parseNum(v[26], true),
      driveType: v[27] || "-",
      
      depth: parseNum(v[29]),
      length: parseNum(v[30]),
      width: parseNum(v[31]),
      weightLbs: parseNum(v[32]),
      
      productLink: v[34] || "#",
      starRating: parseNum(v[35]),
      reviewCount: parseNum(v[36]),
      price: parseNum(v[37])
    };

    results.push(laptop);
  }

  return results;
}

function getMockLaptops(): Laptop[] {
  return [
    {
      refId: "REF-001",
      brand: "ASUS",
      model: "Zenbook 14 OLED",
      segment: "Ultraportable",
      type: "SSD",
      sizeInches: 14,
      pixels: "2880x1800",
      refreshRate: 90,
      panel: "OLED",
      touch: false,
      cpuBrand: "Intel",
      cpuSeries: "Core Ultra 7",
      cores: 16,
      multiThread: true,
      passmarkScore: 21500,
      gpuType: "Integrated",
      gpuBrand: "Intel",
      gpuModel: "Arc Graphics",
      g3dMarkScore: "4200",
      ramGB: 16,
      ramSpeed: "LPDDR5x-7467",
      solderedRAM: true,
      storageGB: 1024,
      driveType: "NVMe Gen4",
      depth: 0.59,
      length: 12.3,
      width: 8.67,
      weightLbs: 2.82,
      productLink: "#",
      starRating: 4.8,
      reviewCount: 120,
      price: 1099
    }
  ];
}
