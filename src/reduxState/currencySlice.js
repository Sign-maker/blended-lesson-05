import { createSlice } from '@reduxjs/toolkit';
import { getBaseCurrency, exchangeCurrency } from './operations';

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    isError: null,
  },
  reducers: {
    setDefaultCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getBaseCurrency.fulfilled, (state, action) => {
      state.baseCurrency = action.payload;
    });
    builder.addCase(exchangeCurrency.fulfilled, (state, action) => {
      state.exchangeInfo = action.payload;
    });
  },
});

export const { setDefaultCurrency } = currencySlice.actions;
