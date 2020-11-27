import { SET_USER } from '../actions';
import { setValue } from '../../lib/store';

const user = (state = {}, action) => {
  const userData = action.payload;
  switch (action.type) {
    case SET_USER:
      setValue('token', userData.token);
      return action.payload;
    default:
      return state;
  }
};

export default user;
