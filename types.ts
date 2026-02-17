
export type Role = 'ADMIN' | 'VIEWER';

export interface Laptop {
  refId: string;
  brand: string;
  model: string;
  segment: string;
  type: string;
  // E (4) - Excluded
  sizeInches: number;
  pixels: string;
  refreshRate: number;
  panel: string;
  touch: boolean;
  // K (10) - Excluded
  cpuBrand: string;
  cpuSeries: string; // v[12]
  cores: number;
  multiThread: boolean;
  passmarkScore: number;
  // Q (16) - Excluded
  gpuType: string;
  gpuBrand: string;
  gpuModel: string;
  g3dMarkScore: number | string;
  // V (21) - Excluded
  ramGB: number;
  ramSpeed: string; // v[23]
  solderedRAM: boolean;
  // Z (25) - Excluded
  storageGB: number;
  driveType: string; // v[27]
  // AC (28) - Excluded
  depth: number;
  length: number;
  width: number;
  weightLbs: number;
  // AH (33) - Excluded
  productLink: string;
  starRating: number;
  reviewCount: number;
  price: number;
}

export interface UserPreferences {
  minPrice: number;
  maxPrice: number;
  brand: string;
  laptopType: string;
  minScreenSize: number;
  touchScreen: boolean | 'any';
  minRAM: number;
  minStorage: number;
  cpuBrand: string;
  gpuType: string;
  gpuBrand: string;
}

export interface SheetConfig {
  sheetId: string;
  tabName: string;
}
