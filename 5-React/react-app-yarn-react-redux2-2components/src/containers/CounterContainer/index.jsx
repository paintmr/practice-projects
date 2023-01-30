import { connect } from "react-redux";
import { incremented, decremented, fetchGitHubUsers } from "../../redux/counterSlice";
import Counter from "../../components/Counter";

const mapStateToProps = (state) => ({ ...state.counter, peopleNum: state.peopleList.people.length });

const mapDispatchToProps = {
  add: incremented,
  minus: decremented,
  reqServer: fetchGitHubUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
