import { createSlice } from '@reduxjs/toolkit'

const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    people: [{ id: 1, name: "雨梨", age: 19 }],
  },
  reducers: {
    addPerson: (state, action) => {
      //下面兩種寫法都能運行代碼，但是一般用第二種方法
      // state.people.unshift(action.payload)
      state.people = [action.payload, ...state.people]
    }
  }
})

export const { addPerson } = peopleSlice.actions

export const peopleReducer = peopleSlice.reducer