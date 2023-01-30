import { connect } from "react-redux";
import People from "../../components/People";
import { addPerson } from "../../redux/peopleSlice"; //引入actions

const mapStateToProps = (state) => ({ peopleList: state.peopleList, sum: state.counter.sum });

const mapDispatchToProps = (dispatch) => {
  return {
    addPerson: (personObj) => {
      dispatch(addPerson(personObj));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(People);
