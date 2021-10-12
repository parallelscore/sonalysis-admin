import * as actions from "./actionsTypes";
import endPoints from "../../api/endPoints"
import {getCall, postCall, deleteCall,s3PostCall} from "../../api/request"
import axios from "axios"


 const postUploadRequest = () => {
  return {
    type: actions.POST_UPLOAD_REQUEST,
  };
};
 const postUploadequest = (data) => {
  return {
    type: actions.POST_UPLOAD_SUCCESS,
    data: data,
  };
};
 const postUploadProgress = (data) => {
  return {
    type: actions.POST_UPLOAD_PROGRESS_SUCCESS,
    data: data,
  };
};
 const postUploadError = (message) => {
  return {
    type: actions.POST_UPLOAD_ERROR,
    data: message,
  };
};

export const createUploadRequest = (file, handleChangeTab,setOpenDragNdropModal) => {
  return (dispatch) => {
    dispatch(postUploadRequest())
    getCall(endPoints.getS3Link)
    .then(async(resLink)=>{
      if (resLink.status === 200) {
        console.log({resLink})
        const {filename,signedUrl} = resLink.data.data
        const postDatadata = {
          filename,
          originalFilename: file.name || file.get("file").name
        }
        console.log({postDatadata, file})
        const config = {
          onUploadProgress: function(progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            dispatch(postUploadProgress({percentCompleted, total: progressEvent.total, progressEvent:progressEvent.loaded}))
          }
        }

        const responseFetch =  await axios.put(signedUrl, file, config);

      if(responseFetch.status===200){
        postCall(endPoints.postUpload , postDatadata)
            .then((response) => {
              if (response.status === 200) {
                  dispatch(postUploadequest(response.data.data));
                  handleChangeTab(1,"all")
                  setOpenDragNdropModal(false)
              }
              if (response.status === 404 || response.status === 403) {
                dispatch(
                  postUploadError({
                    type: "danger",
                    message: "Oops! Request is invalid",
                  })
                );
              }
            })
            .catch(() => {
              dispatch(
                postUploadError({
                  type: "confused",
                  message: "Oops! something went wrong please try again.",
                })
              );
            });
          }
      }

     } ).catch(() => {
      dispatch(
        postUploadError({
          type: "confused",
          message: "Oops! something went wrong please try again.",
        })
      );
    });
      }
};

 const getUploadRequest = () => {
  return {
    type: actions.GET_UPLOAD_REQUEST,
  };
};
 const getUploadequest = (data) => {
  return {
    type: actions.GET_UPLOAD_SUCCESS,
    data: data,
  };
};
 const getUploadError = (message) => {
  return {
    type: actions.GET_UPLOAD_ERROR,
    data: message,
  };
};

export const fetchUploadRequest = (userId, page, analyzed) => {
  // alert("here")
  return (dispatch) => {
    dispatch(getUploadRequest())
    getCall(endPoints.getAllCoach)
        .then((response) => {
          console.log("response.data.data here", response.data)
          if (response.status === 200) {
              dispatch(getUploadequest(response.data.data));
          }
          if (response.status === 404 || response.status === 403) {
            dispatch(
              getUploadError({
                type: "danger",
                message: "Oops! Request is invalid",
              })
            );
          }
        })
        .catch(() => {
          dispatch(
            getUploadError({
              type: "confused",
              message: "Oops! something went wrong please try again.",
            })
          );
        });
      }
};

 const deleteUploadRequest = () => {
  return {
    type: actions.DELETE_UPLOAD_REQUEST,
  };
};
 const deleteUploadequest = (data) => {
  return {
    type: actions.DELETE_UPLOAD_SUCCESS,
    data: data,
  };
};
 const deleteUploadError = (message) => {
  return {
    type: actions.DELETE_UPLOAD_ERROR,
    data: message,
  };
};

export const deleteRequest = (videoId) => {
  // alert("here")
  return async(dispatch) => {
    dispatch(deleteUploadRequest())
    await deleteCall(endPoints.deleteVideo(videoId))
        .then((response) => {
          console.log("response.data.data", response.data)
          if (response.status === 200) {
              dispatch(deleteUploadequest(response.data.data));
          }
          if (response.status === 404 || response.status === 403) {
            dispatch(
              deleteUploadError({
                type: "danger",
                message: "Oops! Request is invalid",
              })
            );
          }
        })
        .catch(() => {
          dispatch(
            deleteUploadError({
              type: "confused",
              message: "Oops! something went wrong please try again.",
            })
          );
        });
      }
};

export const updateUpload = (update) => ({
  type: actions.UPDATE_UPLOAD,
  data: update,
});