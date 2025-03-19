"use client";
import { Invoice } from "../types/invoice";
import { localStorageHelper } from "./localstoragehelper";

const KEY = "invoices"
export const InvoiceService = {
  get: () => {
    const data: Partial<Invoice>[] | null = localStorageHelper.get(KEY);
    console.log('invoices', data);
    return data;
  },
  set: (invoices: Partial<Invoice[]>) => {
    localStorageHelper.set(KEY, invoices);
  },
  clear: () => {
    localStorageHelper.remove(KEY);
  },
};
