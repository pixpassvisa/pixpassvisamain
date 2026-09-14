export interface ComplianceCheck {
  name: string;
  status: "PASS" | "WARN" | "FAIL";
  value: string;
  detail: string;
}
