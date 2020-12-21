import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Discover from '../../components/pages/discover';
import * as CounterActions from '../actions';

const mapStateToProps = state => ({
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
