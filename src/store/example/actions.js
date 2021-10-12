import * as actions from "./actionsTypes";



export const addExampleRequest = (data) => {
  return {
    type: actions.ADD_EXAMPLE_REQUEST,
    data: data,
  };
};
