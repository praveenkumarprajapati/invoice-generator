import { createSlice } from '@reduxjs/toolkit';
import { invoices } from '../services/invoices';
import { Invoice } from '../types/invoice';

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: invoices,
    reducers: {
        addInvoice(state, action) {
            state.push(action.payload);
        },
        removeInvoice(state, action) {
            return state.filter(invoice => invoice.id !== action.payload);
        }
    }
});

export const invoicesSelector = (state: {
    invoices: Invoice[]
}) => state.invoices

export const { addInvoice, removeInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;