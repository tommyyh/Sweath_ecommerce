const allowPayment = (state = false, actions) => {
  switch (actions.type) {
    case 'ALLOW_PAYMENT':
      return (state = true);
    case 'DENY_PAYMENT':
      return (state = false);
    default:
      return state;
  }
};

export default allowPayment;
