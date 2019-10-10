const initialState = {
    loggedIn: false,
    user: null,
    userId: '',
    symbols: [],
    username:'',
  }
  
  const UPDATE_USER = 'UPDATE_USER';
  const LOGOUT = 'LOGOUT';
  const UPDATE_SYMBOLS = 'UPDATE_SYMBOLS';
  
  export default function (state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
    case UPDATE_SYMBOLS:
        return {...state, symbols: payload}
      case UPDATE_USER:
        return { ...state, username: payload.email, userId: payload.user_id };
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
  }

  export function updateSymbols(symbols) {
      return {
          type: UPDATE_SYMBOLS,
          payload: symbols
      }
  }
  
  export function updateUser(userObj) {
    return {
      type: UPDATE_USER,
      payload: userObj
    }
  }
  
  export function logout() {
    return {
      type: LOGOUT
    }
  }