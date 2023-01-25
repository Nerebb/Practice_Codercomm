import { createSlice } from "@reduxjs/toolkit";
import { deleteComment } from "../comment/commentSlice";
import { deletePost } from "../post/postSlice";

const initialState = {
  isOpen: false,
  type: "",
  title: "DOUBLE CHECK !!!",
  content: "Please confirm if your want to delete",
  reqData: undefined,
};

export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_POST = "DELETE_POST";

const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.reqData = action.payload.reqData;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export default slice.reducer;

export const { openModal, closeModal } = slice.actions;

export const confirmAction =
  ({ type, reqData }) =>
  async (dispatch) => {
    switch (type) {
      case DELETE_COMMENT:
        dispatch(deleteComment(reqData));
        dispatch(closeModal());
        break;
      case DELETE_POST:
        dispatch(deletePost(reqData));
        dispatch(closeModal());
        break;
      default:
        dispatch(closeModal());
        break;
    }
  };
