import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import FeedBox from "../components/FeedBox";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, SIGN_IN_REQUEST } from "../reducers/user";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import FeedCreateForm from "../components/FeedCreateForm";
import { FEED_LIST_REQUEST } from "../reducers/feed";

const Home = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { mainFeeds, st_feedCreateDone } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch({
      type: FEED_LIST_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_feedCreateDone) {
      dispatch({
        type: FEED_LIST_REQUEST,
      });
    }
  }, [st_feedCreateDone]);

  return (
    <AppLayout>
      {me && <FeedCreateForm />}

      {mainFeeds &&
        mainFeeds.map((data) => <FeedBox key={data.id} feedData={data} />)}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
