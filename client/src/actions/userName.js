export const setName = (name) => {
  return {
    type: 'SET_NAME',
    userName: name,
  };
};

export const setRole = (role) => {
  return {
    type: 'SET_ROLE',
    userRole: role,
  };
};

export const setEmail = (email) => {
  return {
    type: 'SET_EMAIL',
    userEmail: email,
  };
};
