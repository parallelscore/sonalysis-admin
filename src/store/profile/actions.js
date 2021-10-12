import * as actions from "./actionsTypes";



export const getProfileRequest = (data) => {
  return {
    type: actions.GET_USER_PROFILE_REQUEST,
    data: data,
  };
};
export const updatProfileRequest = (data) => {
  return {
    type: actions.UPDATE_USER_PROFILE_REQUEST,
    data: data,
  };
};
