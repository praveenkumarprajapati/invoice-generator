import { configureStore } from '@reduxjs/toolkit'
import invoiceReducer from '../invoices/invoiceSlice'
import myInfoReducer from '../myinfoSlice'

const store = configureStore({
    reducer: {
        invoices: invoiceReducer,
        myInfo: myInfoReducer
    }
})
export default store