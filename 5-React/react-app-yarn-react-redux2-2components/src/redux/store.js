import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './counterSlice'
import { peopleReducer } from './peopleSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    peopleList: peopleReducer
  }
})

export default store