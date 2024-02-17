import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo, exchangeCurrency as exchangeCurrencyAPI } from 'service';

export const getBaseCurrency = createAsyncThunk(
  'currency/getBaseCurrency',
  async (coords, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We already have base currency!');
    }

    try {
      const data = await getUserInfo(coords);
      return data.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const exchangeCurrency = createAsyncThunk(
  'currency/exchangeCurrency',
  async (payload, thunkAPI) => {
    try {
      const data = await exchangeCurrencyAPI(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
