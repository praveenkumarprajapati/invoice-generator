import { Product } from "./product";

export interface Invoice {
    id: string;
    invoiceNumber: string;
    billTo?: {
        name: string;
        address?: string;
        gstin?: string;
    };
    payTo: {
        name: string;
        address?: string;
        gstin?: string;
    };
    date: string;
    products: Product[];
}