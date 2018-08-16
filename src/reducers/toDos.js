import {ADD_TODO,CRYPTO_HOLDINGS,DELETE_TODO,ENABLE_EDIT, SAVE_EDITED_DATA} from '../constants';

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:{
      if(Array.isArray(action.payload) && action.payload.length > 0){
        return [...action.payload];
      }
      let data = [
        ...state,
        action.payload
      ];
      localStorage.setItem(CRYPTO_HOLDINGS,JSON.stringify(data));
      return data;
    }
    case DELETE_TODO:{
      let list = [...state];
      list.splice(action.payload, 1);
      localStorage.setItem(CRYPTO_HOLDINGS,JSON.stringify(list));
      return [...list];
    }
    case ENABLE_EDIT:{
      let list = [...state];
      list[action.payload].editing = true;
      localStorage.setItem(CRYPTO_HOLDINGS,JSON.stringify(list));
      return [...list];
    }
    case SAVE_EDITED_DATA:{
      let list = [...state];
      list[action.payload.index] = action.payload.data;
      localStorage.setItem(CRYPTO_HOLDINGS,JSON.stringify(list));
      return [...list];
    }
    default:
      return state;
  };
};

export default todos;