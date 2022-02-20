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
      console.log('CLEAR', CLEAR);
      
      return {};
    default:
      return state;
    // throw new Error('Cache redux action type does match any available types');
  }
};

export default cacheReducer;
