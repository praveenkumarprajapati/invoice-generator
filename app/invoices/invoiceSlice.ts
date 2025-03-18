import { createSlice } from '@reduxjs/toolkit';
import { invoices } from '../services/invoices';

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

export const { addInvoice, removeInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;