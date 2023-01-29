import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const addAsync = createAsyncThunk('addAsyncMark', async (data) => {
  await setTimeout(() => {

  }, 500);
  return data

})

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    sum: 0
  },
  reducers: {
    incremented: (state, action) => {
      // console.log(action)
      // console.log(action.payload)
      state.sum += action.payload;
    },
    decremented: (state, action) => {
      state.sum -= action.payload;
    },
    oddIncremented: (state, action) => {
      state.sum += action.payload;
    },
    asyncIncremented: (state, action) => {
      state.sum += action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addAsync.fulfilled, (state, action) => {
        state.sum += action.payload
      })
  }
})

export const { incremented, decremented, oddIncremented, asyncIncremented } = counterSlice.actions

export default counterSlice;