const allowCheckout = (state = false, actions) => {
  switch (actions.type) {
    case 'ALLOW_CHECKOUT':
      return (state = true);
    case 'DENY_CHECKOUT':
      return (state = false);
    default:
      return state;
  }
};

export default allowCheckout;
