import * as actions from "./actionsTypes";
import endPoints from "../../api/endPoints"
import {getCall} from "../../api/request"



 const fetchLocatioRequest = (data) => {
  return {
    type: actions.GET_LOCATION_SUCCESS,
    data: data,
  };
};
 const fetchLocationError = (message) => {
  return {
    type: actions.GET_LOCATION_ERROR,
    data: message,
  };
};

export const fetchLocation = ( data) => {
  return (dispatch) => {
      getCall(endPoints.location)
        .then((response) => {
          if (response.status === 200) {
              dispatch(fetchLocatioRequest(response.data.data));
          }
          if (response.status === 404 || response.status === 403) {
            dispatch(
              fetchLocationError({
                type: "danger",
                message: "Oops! Request is invalid",
              })
            );
          }
        })
        .catch(() => {
          dispatch(
            fetchLocationError({
              type: "confused",
              message: "Oops! something went wrong please try again.",
            })
          );
        });
      }
};