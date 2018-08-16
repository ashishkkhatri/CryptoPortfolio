import { CRYPTO_DATA  } from '../constants';

const cryptoData = (state = {}, action) => {
  switch (action.type) {
    case CRYPTO_DATA:{
      return Object.assign({},state,{
         cryptoData: action.payload
      });
    }
    default:
      return state;
  };
};

export default cryptoData;