import { DocumentType, BgColor } from "./types";
import { getFilteredDocumentTypes } from "@/lib/specs";

export const documentTypes: DocumentType[] = getFilteredDocumentTypes();

export const bgColors: BgColor[] = [
  { id: "white", label: "Pure White", swatch: "bg-white border-gray-300" },
  { id: "light-gray", label: "Light Gray", swatch: "bg-gray-200 border-gray-300" },
  { id: "light-blue", label: "Light Blue", swatch: "bg-blue-100 border-blue-200" },
  { id: "blue", label: "Blue", swatch: "bg-blue-700 border-blue-800" },
  { id: "transparent", label: "Transparent", swatch: "bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rV7928bExPT/////wMEGABoCBAMc2jMkgAAAABJRU5ErkJggg==')] border-gray-300" },
];
