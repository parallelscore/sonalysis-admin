import * as actions from './actionsTypes';

const defaultState = {
    data: [],
    loading: false,
    error: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actions.GET_LOCATION_SUCCESS:
            return { data: action.data, loading: false };
        case actions.GET_LOCATION_ERROR:
            return { data: action.data, loading: false, error: false };
        default:
            return state;
    }
};
