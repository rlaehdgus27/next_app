import React from "react";
import styled from "styled-components";
import { Card, Avatar, Image } from "antd";
import {
  EditOutlined,
  HeartOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const FeedCard = styled(Card)`
  width: 310px;
  margin-bottom: 100px;
  box-shadow: 0px 1px 3px #000;

  @media only screen and (min-width: 576px) {
    width: 550px;
    margin-bottom: 140px;
  }
`;

const FeedImage = styled(Image)`
  width: 100%;
  height: 300px;

  object-fit: cover;

  @media only screen and (min-width: 576px) {
    height: 600px;
  }
`;

const FeedBox = ({ feedData }) => {
  return (
    <FeedCard
      cover={
        <FeedImage
          alt={feedData.title}
          src={`http://localhost:4000/${feedData.imagePath}`}
        />
      }
      actions={[
        <CommentOutlined key="comment" />,
        <HeartOutlined key="heart" />,
        <EditOutlined key="edit" />,
      ]}
    >
      <FeedCard.Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={feedData.title}
        description={feedData.content}
      />
    </FeedCard>
  );
};

export default FeedBox;
