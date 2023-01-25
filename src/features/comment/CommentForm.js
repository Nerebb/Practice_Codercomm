import React, { useState } from "react";

import { Stack, Avatar, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { createComment, editComment } from "./commentSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

function CommentForm({ comment, postId, type = "Default", setIsEdit }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "Edit" && comment.content) setContent(comment.content);
  }, [type, comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (type) {
      case "Default":
        dispatch(createComment({ postId, content }));
        break;
      case "Edit":
        dispatch(editComment({ commentId: comment._id, postId, content }));
        setIsEdit(false);
        break;
      default:
        return toast.error("Unknow request");
    }
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center">
        {type !== "Edit" && <Avatar src={user.avatarUrl} alt={user.name} />}
        <TextField
          fullWidth
          size="small"
          value={content}
          placeholder="Write a comment…"
          onChange={(event) => setContent(event.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: (theme) =>
                `${theme.palette.grey[500_32]} !important`,
            },
            input: {
              backgroundColor: (theme) =>
                type === "Edit"
                  ? `${theme.palette.common.white} !important`
                  : "",
              borderRadius: (theme) => theme.shape.borderRadius,
            },
          }}
        />
        <IconButton type="submit">
          <SendIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
    </form>
  );
}

export default CommentForm;
