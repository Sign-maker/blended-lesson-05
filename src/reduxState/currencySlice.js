import { createSlice } from '@reduxjs/toolkit';
import { getBaseCurrency } from './operations';

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
  },
  extraReducers: builder => {
    builder.addCase(getBaseCurrency.fulfilled, (state, action) => {
      state.baseCurrency = action.payload;
    });
  },
});
