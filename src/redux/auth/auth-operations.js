import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const registration = createAsyncThunk(
  'auth/register',
  async (info, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', info);
      token.set(data.token);
      return data;
    } catch (e) {
      alert('Please try again with correct velues');
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const loggining = createAsyncThunk('auth/login', async (info, thunkAPI) => {
  console.log(info);
  try {
    const { data } = await axios.post('/users/login', info);
    token.set(data.token);
    console.log(data);
    return data;
  } catch (e) {
    alert('Please try again with correct velues');
    return thunkAPI.rejectWithValue(e.message);
  }
});

const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) return thunkAPI.rejectWithValue();

    token.set(persistedToken);

    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const operations = {
  registration,
  logOut,
  loggining,
  fetchCurrentUser,
};

export default operations;
