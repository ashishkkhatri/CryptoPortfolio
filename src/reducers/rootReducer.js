import { combineReducers } from 'redux';
import todos from './toDos';
import cryptoData from './cryptoData';
import quickSearchCryptoData from './quickSearchCryptoData';

export default combineReducers({
  todos,
  cryptoData,
  quickSearchCryptoData
});