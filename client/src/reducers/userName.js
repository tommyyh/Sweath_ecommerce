export const userName = (state = '', actions) => {
  switch (actions.type) {
    case 'SET_NAME':
      return (state = actions.userName);
    default:
      return state;
  }
};

export const userRole = (state = 'CUSTOMER', actions) => {
  switch (actions.type) {
    case 'SET_ROLE':
      return (state = actions.userRole);
    default:
      return state;
  }
};

export const userEmail = (state = '', actions) => {
  switch (actions.type) {
    case 'SET_EMAIL':
      return (state = actions.userEmail);
    default:
      return state;
  }
};
