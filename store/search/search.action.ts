import { UpdateType, UPDATE_SEARCH_TYPE } from "./search.type";

export const updateSearchType = (type: string): UpdateType => {
    return {
        type: UPDATE_SEARCH_TYPE,
        payload: { type },
    };
};
