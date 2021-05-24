import { combineReducers } from 'redux';

// Reducers
import isLogged from '../reducers/isLogged';
import { userName, userRole, userEmail } from '../reducers/userName';
import userMenu from '../reducers/userMenu';
import allowCheckout from '../reducers/allowCheckout';
import allowPayment from '../reducers/allowPayment';
import allowFinish from '../reducers/allowFinish';

// Combine all reducers
const allReducers = combineReducers({
  isLogged: isLogged,
  userName: userName,
  userRole: userRole,
  userMenu: userMenu,
  allowCheckout: allowCheckout,
  allowPayment: allowPayment,
  userEmail: userEmail,
  allowFinish: allowFinish,
});

export default allReducers;
