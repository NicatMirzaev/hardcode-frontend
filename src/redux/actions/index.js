export const SET_USER = 'SET_USER';
export const SET_CATEGORIES = "SET_CATEGORIES";

export const setUser = userObj => ({
  type: SET_USER,
  payload: userObj,
});

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  payload: categories
});
