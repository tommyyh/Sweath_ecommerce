const allowFinish = (state = false, actions) => {
  switch (actions.type) {
    case 'ALLOW_FINISH':
      return (state = true);
    default:
      return state;
  }
};

export default allowFinish;
