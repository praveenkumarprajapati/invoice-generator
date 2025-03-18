import { Invoice } from "../types/invoice";
import _ from 'lodash';


export const invoices: Invoice[] = [
    {
        id: "1e7b9d2e-8f6b-4e3b-9f6b-1e7b9d2e8f6b",
        payTo: { name: "D Mart", address: "Mumbai"},
        billTo: { name: "John Doe", address: "Pune"},
        date: `2021-10-10`,
        invoiceNumber: "INV-001",
        products: [
            {
            id: "1a7b9d2e-8f6b-4e3b-9f6b-1a7b9d2e8f6b",
            name: "Amul Milk",
            perUnitPrice: 25,
            quantity: 2,
            unit: 'litre',
            sgst: 5,
            cgst: 5
        }, {
            id: "1b7b9d2e-8f6b-4e3b-9f6b-1b7b9d2e8f6b",
            name: "Amul Butter",
            perUnitPrice: 50,
            quantity: 10,
            unit: 'gram',
            sgst: 5,
            cgst: 5
        },
        ...(_.times(100, (i) => {
            return {
                id: `1c7b9d2e-8f6b-4e3b-9f6b-1c7b9d2e8f6b-${i}`,
                name: `Product ${i}`,
                perUnitPrice: 100,
                quantity: 10,
                unit: 'gram' as 'gram',
                sgst: 5,
                cgst: 5
            }
        }))
    ]
    }
];
