import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter', //name of the slice
  initialState: {
    count: 0, // this is the state with initial value
    name: '',
  },
  reducers: {
    //it's a function which update the state based on action type

    increment: (state) => {
      //increament action type
      state.count += 1;
    },
    decrement: (state) => {
      //decreament action type
      state.count -= 1;
    },

    doubleIncrement: (state) => {
      //decreament action type
      state.count += 2;
    },
    doubleDecrement: (state) => {
      //decreament action type
      state.count -= 2;
    },

    changeName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  doubleDecrement,
  doubleIncrement,
  changeName,
} = counterSlice.actions;
export default counterSlice.reducer;
