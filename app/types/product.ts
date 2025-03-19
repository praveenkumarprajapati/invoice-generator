export interface Product {
  id: string;
  description: string;
  perUnitPrice: number;
  sgst: number;
  cgst: number;
  quantity: number;
  unit: "kg" | "litre" | "piece" | "meter" | "gram";
}
