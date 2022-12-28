import { UPDATE_SEARCH_TYPE, SearchState, UpdateType } from "./search.type";

export const initialState: SearchState = {
    type: "dataset",
};

const searchReducer = (
    state: SearchState = initialState,
    action: UpdateType
) => {
    switch (action.type) {
        case UPDATE_SEARCH_TYPE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default searchReducer;
