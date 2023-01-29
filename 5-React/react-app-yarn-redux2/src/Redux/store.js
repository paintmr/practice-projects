import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'

// createSlice用於創建reducers和actions的集合。
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    sum: 0,
    isFirstLoad: true,
    isLoading: false,
    error: "",
    datafromServer: [],
  },
  // 同步reduer
  reducers: {
    incremented: (state, action) => {
      console.log(action)
      state.sum += action.payload
    },
    decremented: (state, action) => {
      state.sum -= action.payload
    },
    incrementedOdd: (state, action) => {
      if (state.sum % 2 !== 0) {
        state.sum += action.payload
      }
    }
  },
  // 異步reducers。builder是個固定的參數。把要添加的異步action及其狀態都放到addCase()的參數位置
  extraReducers: builder => {
    builder
      .addCase(fetchThunkAction.pending, (state, action) => {
        state.isFirstLoad = false
        state.isLoading = true
      }).addCase(fetchThunkAction.fulfilled, (state, action) => {
        state.datafromServer = action.payload
        state.isLoading = false
      }).addCase(fetchThunkAction.rejected, (state, action) => {
        console.log(action)
        state.error = action.error.message
      })
  }
})

// 創建異步的action。createAsyncThunk第1個參數是這個異步action的type的名字。在上面的createAsyncThunk的extraReducers中打印action可見。createAsyncThunk第2個參數接個回調函數。這個回調函數的參數是store.dispatch調用fetchThunkAction()傳入的參數。
export const fetchThunkAction = createAsyncThunk('fetchGitHubUsers', async (test) => {
  console.log(test)
  const res = await fetch("https://api.github.com/search/users?q=qaqaqa");
  const data = await res.json();
  return data.items
})

// 導出actions給頁面去調用
export const { incremented, decremented, incrementedOdd } = counterSlice.actions

// 創建store
const store = configureStore({
  reducer: counterSlice.reducer
})

export default store