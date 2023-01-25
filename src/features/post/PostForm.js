import React, { useCallback } from "react";
import { Box, Card, alpha, Stack } from "@mui/material";

import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createPost, editPost } from "./postSlice";
import { LoadingButton } from "@mui/lab";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

function PostForm({ type = "Default", post, setEditPost, userId, page }) {
  const { isLoading } = useSelector((state) => state.post);

  const defaultValues = {
    content: type === "Edit" && post ? post.content : "",
    image: type === "Edit" && post ? post.image : "",
  };

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const onSubmit = (data) => {
    switch (type) {
      case "Default":
        return dispatch(createPost(data)).then(() => reset());
      case "Edit":
        const editPostData = {
          editPostId: post._id,
          content: data.content,
          image: data.image,
          userId,
          page,
        };
        return dispatch(editPost(editPostData))
          .then(() => setEditPost(false))
          .catch(() => setEditPost(true));
      default:
        break;
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="Share what you are thinking here..."
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              {type === "Default" ? "Post" : "Edit Post"}
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
