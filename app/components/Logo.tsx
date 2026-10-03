import { ScanFace } from "lucide-react";
interface LogoProps { className?: string; size?: "sm" | "md" | "lg"; variant?: "light" | "dark"; }
export default function Logo({ className = "", size = "md", variant = "dark" }: LogoProps) {
  return <span className={`inline-flex items-center gap-2 font-semibold tracking-tight ${size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl"} ${variant === "light" ? "text-white" : "text-[#20372c]"} ${className}`}><ScanFace aria-hidden="true" size={size === "sm" ? 25 : 31} strokeWidth={1.6} /><span>pixpassvisa.com</span></span>;
}
