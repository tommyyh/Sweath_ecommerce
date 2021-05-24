const isLogged = (state = false, actions) => {
  switch (actions.type) {
    case 'SIGN_IN':
      return (state = true);
    case 'LOGOUT':
      return (state = false);
    default:
      return state;
  }
};

export default isLogged;
