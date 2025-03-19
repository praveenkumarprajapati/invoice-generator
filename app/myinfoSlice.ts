/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { createSlice } from '@reduxjs/toolkit';
import { MyInfoService } from './services/myInfo';
import { MyInfo } from './types/myInfo';

const myInfoSlice = createSlice({
    name: 'myInfo',
    initialState: {},
    reducers: {
        updateMyInfo(state, action) {   
            state = {
                ...state,
                ...action.payload
            };
            MyInfoService.setMyInfo(state);
            return state;
        },
        removeMyInfo(state) {
            const newState = {
                name: '',
                address: '',
                gstin: ''
            }
            MyInfoService.setMyInfo(newState);
            return state = newState;
        }
    }
});

export const { updateMyInfo, removeMyInfo } = myInfoSlice.actions;
export const myInfoSelector = (state: {
    myInfo: MyInfo
}) => state.myInfo
export default myInfoSlice.reducer;