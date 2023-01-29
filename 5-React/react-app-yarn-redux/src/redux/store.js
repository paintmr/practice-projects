import { configureStore } from '@reduxjs/toolkit'
// counterSlice.js文件=reduces+actions，而且不用開發者自己寫actions
import counterSlice from './counterSlice'
import thunk from 'redux-thunk'



const store = configureStore({
  reducer: counterSlice.reducer,
  middleware: [thunk]
})

// export const thunkFunctionCreator = (asyncIncremented, selectedValue) => {
//   return (dispatch, getState) => {
//     // console.log(data)
//     console.log(getState())
//     setTimeout(() => {
//       store.dispatch(asyncIncremented(selectedValue));
//     }, 500);
//   }
// }

// store.dispatch(thunkFunctionCreator('g'))

export default store;