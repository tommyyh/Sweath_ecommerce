const userMenu = (state = '', actions) => {
  switch (actions.type) {
    case 'OPEN_LOGIN':
      return (state = 'login');
    case 'OPEN_REGISTER':
      return (state = 'register');
    case 'CLOSE_MENU':
      return (state = '');
    default:
      return state;
  }
};

export default userMenu;
