import { CLEAR, DELETE, UPDATE } from './cache.type';

export const updateCache = (key: string, value: any) => {
  return {
    type: UPDATE,
    payload: { [key]: value },
  };
};

export const deleteCache = (key: string) => {
  return {
    type: DELETE,
    payload: key,
  };
};

export const clearCache = () => {
  return {
    type: CLEAR,
    payload: undefined, 
  };
};
