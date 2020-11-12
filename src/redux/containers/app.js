import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../../components/app';
import * as CounterActions from '../actions';

const mapStateToProps = state => ({
  counter: state.counter,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
