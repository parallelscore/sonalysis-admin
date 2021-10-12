import * as actions from "./actionsTypes";

const defaultState = {
  allUploadData: [],
  singleUploadData: [],
  postLoading: false,
  postError: false,
  getLoading: false,
  getError: false,
  deleteLoading: false,
  deleteError: false,
  progress: { percentCompleted: 0, progressEvent: 0, total: 0 },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.POST_UPLOAD_REQUEST:
      return { ...state, postLoading: true };
    case actions.POST_UPLOAD_PROGRESS_SUCCESS:
      return { ...state, progress: action.data };
    case actions.POST_UPLOAD_SUCCESS:
      return { ...state, data: action.data, postLoading: false };
    case actions.POST_UPLOAD_ERROR:
      return { ...state, postLoading: false, postError: false };
    case actions.GET_UPLOAD_REQUEST:
      return { ...state, getLoading: true };
    case actions.GET_UPLOAD_SUCCESS:
      return { ...state, allUploadData: action.data, getLoading: false };
    case actions.GET_UPLOAD_ERROR:
      return { ...state, getLoading: false, error: false };
    case actions.DELETE_UPLOAD_REQUEST:
      return { ...state, deleteLoading: true };
    case actions.DELETE_UPLOAD_SUCCESS:
      return { ...state, allUploadData: action.data, getLoading: false };
    case actions.DELETE_UPLOAD_ERROR:
      return { ...state, getLoading: false, deleteLoading: false };
    case actions.UPDATE_UPLOAD:
      const data = state.allUploadData.data.map((item) => {
        if (item._id === action.data._id) return action.data;
        return item;
      });
      return { ...state, allUploadData: { ...state.allUploadData, data } };
    default:
      return state;
  }
};
