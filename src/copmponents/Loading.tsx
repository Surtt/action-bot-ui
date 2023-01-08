import { Spin } from "antd";
import React from "react";
import { useIsFetching } from "@tanstack/react-query";

const Loading = () => {
  const isFetching = useIsFetching();
  return (
    <>
      {isFetching ? (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : null}
    </>
  );
};

export default Loading;
