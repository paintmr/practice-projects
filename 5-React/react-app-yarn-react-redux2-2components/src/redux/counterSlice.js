import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    sum: 0,
    isFirstLoading: true,
    isLoading: false,
    error: "",
    gitHubUsers: [],
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
      .addCase(fetchGitHubUsers.pending, (state, action) => {
        state.isFirstLoading = false
        state.isLoading = true
      })
      .addCase(fetchGitHubUsers.fulfilled, (state, action) => {
        state.gitHubUsers = action.payload
        state.isLoading = false

      })
      .addCase(fetchGitHubUsers.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export const { incremented, decremented } = counterSlice.actions

export const fetchGitHubUsers = createAsyncThunk('gitHubUsers', async () => {
  const response = await fetch("https://api.github.com/search/users?q=qaqaqa");
  const data = await response.json();
  return data.items
})

export const counterReducer = counterSlice.reducer