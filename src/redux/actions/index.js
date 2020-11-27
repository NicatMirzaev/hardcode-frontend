export const SET_USER = 'SET_USER';

export const setUser = userObj => ({
  type: SET_USER,
  payload: userObj,
});
