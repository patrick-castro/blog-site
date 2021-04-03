const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

const SIGNED_OUT_STATE = {
  isSignedIn: false,
  userId: null,
  authorFirstName: null,
  authorLastName: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, ...action.payload, isSignedIn: true };
    case 'SIGN_OUT':
      return SIGNED_OUT_STATE;
    default:
      return state;
  }
};

export default authReducer;
