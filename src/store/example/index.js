import * as actions from "./actionsTypes";

const defaultState = {
  data: [],
  loading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.ADD_EXAMPLE_REQUEST:
      let addExample = [action.data, ...state.data];
      return { addExample, loading: false };
    default:
      return state;
  }
};
