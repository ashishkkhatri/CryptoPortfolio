
import { QUICK_SEARCH_CRYPTO_DATA } from '../constants';

const quickSearchCryptoData = (state = [], action) => {
  switch (action.type) {
    case QUICK_SEARCH_CRYPTO_DATA:{
      return [
        ...action.payload
      ];
    }
    default:
      return state;
  };
};

export default quickSearchCryptoData;