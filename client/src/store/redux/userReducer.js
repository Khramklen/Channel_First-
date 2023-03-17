import { initState } from '../initState';


export const userReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'AUTH':
      return { id: payload.userId };
    case 'LOGOUT':
      return state = initState;
    default:
      return state;
  }
}
