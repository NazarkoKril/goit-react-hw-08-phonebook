import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contacts-operations';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.isLoading = true;
      return state;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
      return state;
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      return state;
    });
    builder.addCase(addContact.pending, (state) => {
      state.isLoading = true;
      return state;
    });
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
      return state;
    });
    builder.addCase(deleteContact.pending, (state) => {
      state.isLoading = true;
      return state;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.items = state.items.filter((contact) => contact.id !== action.payload);
      state.isLoading = false;
      return state;
    });
  },
});

