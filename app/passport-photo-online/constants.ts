import { DocumentType, BgColor } from "./types";
import { getFilteredDocumentTypes } from "@/lib/specs";

export const documentTypes: DocumentType[] = getFilteredDocumentTypes();

export const bgColors: BgColor[] = [
  { id: "white", label: "Pure White", swatch: "bg-white border-gray-300" },
  { id: "light-gray", label: "Light Gray", swatch: "bg-gray-200 border-gray-300" },
  { id: "light-blue", label: "Light Blue", swatch: "bg-[#dbeafe] border-[#bfdbfe]" },
  { id: "blue", label: "Blue", swatch: "bg-[#1d4ed8] border-[#1e40af]" },
  { id: "transparent", label: "Transparent", swatch: "bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2rV7928bExPT/////wMEGABoCBAMc2jMkgAAAABJRU5ErkJggg==')] border-gray-300" },
];
