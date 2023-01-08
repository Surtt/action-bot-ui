import React from "react";
import { useCookies } from "react-cookie";
import { useStateContext } from "../context";

const HomePage = () => {
  const stateContext = useStateContext();
  console.log(stateContext.state.authUser);
  return <div>Home Page</div>;
};

export default HomePage;
