import store from '../store';
import { userAction } from '../actions/';

const errorHandler = err => {
  console.log(err)
  if (err.response.status === 401) {
    store.dispatch(userAction.sessionTimeExpired());
  }
};

export default errorHandler;
