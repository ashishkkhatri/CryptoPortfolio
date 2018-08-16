
import { QUICK_SEARCH_CRYPTO_DATA, CRYPTO_DATA, ADD_TODO, DELETE_TODO, ENABLE_EDIT, SAVE_EDITED_DATA } from '../constants';

export function addToToDoList(data){
  return {
    type: ADD_TODO,
    payload: data
  }
}

export function deleteItemAction(index){
  return {
    type: DELETE_TODO,
    payload: index
  };
}

export function enableEditAction(index){
  return {
    type:ENABLE_EDIT,
    payload: index
  };
}

export function saveEditedAction(index,data){
  return {
    type: SAVE_EDITED_DATA,
    payload: {index,data}
  };
}

export function saveCryptoData(data){
  return {
    type: CRYPTO_DATA,
    payload: data
  }
}

export function saveCryptoQuickSearchData(data){
  return {
    type: QUICK_SEARCH_CRYPTO_DATA,
    payload: data
  }
}