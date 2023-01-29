import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    sum: 0,
    users: [],
    isFirstLoading: true,
    isLoading: false,
    error: "",
  },
  reducers: {
    incremented: (state, action) => {
      state.sum += action.payload
    },
    decremented: (state, action) => {
      state.sum -= action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchServerData.pending, (state, action) => {
        state.isFirstLoading = false;
        state.isLoading = true
      })
      .addCase(fetchServerData.fulfilled, (state, action) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(fetchServerData.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export const fetchServerData = createAsyncThunk('GitHubUsers', async () => {
  const response = await fetch("https://api.github.com/search/users?q=qaqaqa");
  const data = await response.json();
  return data.items
})

const store = configureStore({
  reducer: counterSlice.reducer
})

export const { incremented, decremented } = counterSlice.actions
export default store