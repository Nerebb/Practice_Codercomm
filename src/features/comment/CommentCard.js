import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import CommentBtn from "./CommentBtn";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import CommentForm from "./CommentForm";
import { DELETE_COMMENT, openModal } from "../modal/modalSlice";

function CommentCard({ comment, postId }) {
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useAuth();
  const dispatch = useDispatch();

  function handlePopoverOpen() {
    setIsHover(true);
  }
  function handlePopoverClose() {
    setIsHover(false);
  }

  function handleDeleteComment() {
    dispatch(
      openModal({
        type: DELETE_COMMENT,
        reqData: { commentId: comment._id, postId },
      })
    );
  }

  function handleEditComment() {
    setIsEdit(true);
  }

  return (
    <Stack
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      direction="row"
      spacing={2}
    >
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        {!isEdit ? (
          <>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {comment.content}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <CommentReaction comment={comment} />
            </Box>
          </>
        ) : (
          <CommentForm
            type="Edit"
            comment={comment}
            postId={postId}
            setIsEdit={setIsEdit}
          />
        )}
      </Paper>
      {isHover && user._id === comment.author._id && (
        <CommentBtn
          handleDeleteComment={handleDeleteComment}
          handleEditComment={handleEditComment}
        />
      )}
    </Stack>
  );
}

export default CommentCard;
