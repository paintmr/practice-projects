import { connect } from "react-redux";
import { incremented, decremented, fetchServerData } from "../../redux/store";

import Counter from "../../components/Counter";

// mapStateToProps寫法1
// const mapStateToProps = (state) => {
//   return { sum: state.sum, users: state.users, isFirstLoading: state.isFirstLoading, isLoading: state.isLoading, error: state.error };
// };

// mapStateToProps寫法2
const mapStateToProps = (state) => {
  return { ...state };
};

// mapDispatchToProps寫法1
// const mapDispatchToProps = (dispatch) => {
//   return {
//     add: (num) => {
//       dispatch(incremented(num));
//     },
//     minus: (num) => {
//       dispatch(decremented(num));
//     },
//     getServerData: () => {
//       dispatch(fetchServerData());
//     },
//   };
// };

// mapDispatchToProps寫法2
// const mapDispatchToProps = (dispatch) => ({
//   add: (num) => dispatch(incremented(num)),
//   minus: (num) => dispatch(decremented(num)),
//   getServerData: () => {
//     dispatch(fetchServerData());
//   },
// });

// mapDispatchToProps寫法3
const mapDispatchToProps = {
  add: incremented,
  minus: decremented,
  getServerData: fetchServerData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
