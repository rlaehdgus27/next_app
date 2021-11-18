import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import AppHeader from "./AppHeader";
import styled from "styled-components";
import MyMenu from "./MyMenu";

const MainCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
`;

const AppLayout = ({ children }) => {
  return (
    <>
      <header>
        <AppHeader />
      </header>

      <Row>
        <Col xs={0} sm={4}>
          <MyMenu />
        </Col>
        <MainCol xs={24} sm={16}>
          {children}
        </MainCol>
        <Col xs={0} sm={4}>
          RIGHT
        </Col>
      </Row>
    </>
  );
};

AppLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
