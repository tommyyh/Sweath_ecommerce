import { createStore } from 'redux';

// Components
import allReducers from '../reducers/allReducers';

// Store
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
