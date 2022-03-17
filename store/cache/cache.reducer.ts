import { Action, CacheType, DELETE, CLEAR, UPDATE } from './cache.type';

const initialState: CacheType = {};

const cacheReducer = (state: CacheType = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    case CLEAR:
      return {};
    default:
      return state;
  }
};

export default cacheReducer;
