export const UPDATE = 'update';
export const DELETE = 'delete';
export const CLEAR = 'clear';

export type Action = {
  type: string;
  payload: any;
};

export type CacheType = {
  [key: string]: any;
};
