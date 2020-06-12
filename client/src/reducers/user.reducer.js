import isEmpty from '../utils/isEmpty';

const initialState = {
  isAuthenticated: false,
  userData: {},
  isUserDataLoading: false,
  isSessionTimeExpired: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        userData: action.payload,
        isUserDataLoading: false,
        isSessionTimeExpired: false,
        isAuthenticated: !isEmpty(action.payload)
      };

    case 'USER_LOGOUT':
      return {
        ...state,
        userData: {},
        isAuthenticated: false,
        isUserDataLoading: false,
        isSessionTimeExpired: false
      };

    case 'USER_DATA_LOADING':
      return {
        ...state,
        isUserDataLoading: true,
        isSessionTimeExpired: false
      };

    case 'SESSION_TIME_EXPIRED':
      return {
        ...state,
        isSessionTimeExpired: true
      };

    default:
      return state;
  }
};

export default reducer;
