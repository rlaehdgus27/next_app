import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input, Button, Image, message } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  IMAGE_UPLOAD_REQUEST,
  FEED_CREATE_REQUEST,
  CLEAR_PREVIEW_IMAGE,
} from "../reducers/feed";

const FeedBox = styled.div`
  width: 550px;
  padding: 20px 0;
  margin-bottom: 10px;
`;

const FeedContent = styled(Input.TextArea)`
  resize: none;
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
`;

const PreviewImg = styled(Image)`
  margin: 10px 0;
`;

const FeedCreateForm = () => {
  const dispatch = useDispatch();

  const { previewImage, st_feedCreateDone } = useSelector(
    (state) => state.feed
  );

  const imageFile = useRef();

  const [content, setContent] = useState("");

  const contentOnChange = (e) => {
    setContent(e.target.value);
  };

  const fileButtonClick = useCallback(() => {
    imageFile.current.click();
  });

  const fileChange = useCallback(
    (e) => {
      const sendFile = e.target.files[0];

      const formData = new FormData();

      formData.append("image", sendFile);

      dispatch({
        type: IMAGE_UPLOAD_REQUEST,
        data: formData,
      });
    },
    [imageFile.current]
  );

  const feedHandler = useCallback(() => {
    if (content === "") {
      return message.error("내용을 입력해주세요");
    }
    if (previewImage === null) {
      return message.error("이미지를 선택해주세요");
    }

    dispatch({
      type: FEED_CREATE_REQUEST,
      data: {
        content,
        imagePath: previewImage,
      },
    });
  }, [previewImage, content]);

  useEffect(() => {
    if (st_feedCreateDone) {
      message.success("새로운 피드가 등록되었습니다.");

      setContent("");
      dispatch({
        type: CLEAR_PREVIEW_IMAGE,
      });
    }
  }, [st_feedCreateDone]);

  return (
    <FeedBox>
      <FeedContent
        value={content}
        onChange={contentOnChange}
        allowClear={true}
        placeholder="content..."
      />
      <input
        type="file"
        hidden
        ref={imageFile}
        accept=".png, .jpg"
        onChange={fileChange}
      />

      <Button type="dashed" onClick={fileButtonClick}>
        UPLOAD
      </Button>

      <Button type="primary" onClick={feedHandler}>
        게시글 작성
      </Button>

      {previewImage && (
        <PreviewImg src={`http://localhost:4000/${previewImage}`} />
      )}
    </FeedBox>
  );
};
export default FeedCreateForm;
