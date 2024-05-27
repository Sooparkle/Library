import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  dataList :null,
}


const searchSlice = createSlice({
  name : 'searchResult',
  initialState,
  reducers:{
    resultList : (state, action) => {
      state.dataList = action.payload;
    }
  }
})

export const {resultList} = searchSlice.actions;

export default searchSlice.reducer;