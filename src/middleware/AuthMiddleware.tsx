import Loading from "../copmponents/Loading";
import { useQuery } from "@tanstack/react-query";
import { useStateContext } from "../context";
import { getMe } from "../api/authApi";
import { useCookies } from "react-cookie";
import { FC, ReactElement } from "react";

type AuthMiddlewareProps = {
  children: ReactElement;
};

const AuthMiddleware: FC<AuthMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(["logged_in"]);
  const stateContext = useStateContext();

  const query = useQuery(["authUser"], () => getMe(cookies.logged_in), {
    enabled: !!cookies.logged_in,
    // select: (data) => data,
    onSuccess: (data) => {
      console.log(data, "auth");
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
  });

  if (query.isLoading && cookies.logged_in) {
    return <Loading />;
  }

  return children;
};

export default AuthMiddleware;
