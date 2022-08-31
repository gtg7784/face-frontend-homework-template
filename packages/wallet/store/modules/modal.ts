import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';

type ModalState = {
  registerStage: 'login' | 'verification' | 'password' | 'success' | null,
  transactionStage: 'confirm' | 'success' | null,
}

const initialState: ModalState = {
  registerStage: null,
  transactionStage: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setRegisterStage: (state, action) => {
      state.registerStage = action.payload;
    },
    setTransactionStage: (state, action) => {
      state.transactionStage = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.modal,
    }),
  },
});

export default modalSlice.reducer;
export const {
  setRegisterStage, setTransactionStage,
} = modalSlice.actions;
