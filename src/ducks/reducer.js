const initialState = {
    username: '',
    userId: '',
    symbols: [],
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
        return { ...state, username: payload.username, userId: payload.user_id };
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
  
  export function updateUser(user) {
    return {
      type: UPDATE_USER,
      payload: user
    }
  }
  
  export function logout() {
    return {
      type: LOGOUT
    }
  }