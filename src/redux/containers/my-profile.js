import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MyProfile from '../../components/pages/my-profile';
import * as CounterActions from '../actions';

const mapStateToProps = state => ({
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
