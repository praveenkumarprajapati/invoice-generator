import { createSlice } from '@reduxjs/toolkit';
import { Invoice } from '../types/invoice';
import { InvoiceService } from '../services/invoices';

const initialState: Invoice[] = []

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: initialState,
    reducers: {
        syncInvoices(state, action) {
            state = [...(action.payload || initialState)]
            return state;
        },
        addInvoice(state, action) {
            state.push(action.payload);
            InvoiceService.set(state as Invoice[]);
            return state;
        },
        removeInvoice(state, action) {
            const updated = state.filter(invoice => invoice.id !== action.payload);
            InvoiceService.set(updated);
            return updated
        }
    }
});

export const invoicesSelector = (state: {
    invoices: Invoice[]
}) => state.invoices

export const { addInvoice, removeInvoice, syncInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;