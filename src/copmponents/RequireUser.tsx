import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context";
import { getMe } from "../api/authApi";
import Loading from "./Loading";
import { useCookies } from "react-cookie";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies(["logged_in"]);
  const location = useLocation();
  const stateContext = useStateContext();

  const {
    isLoading,
    isFetching,
    data: user,
  } = useQuery(["authUser"], () => getMe(cookies.logged_in), {
    retry: 1,
    // select: (data) => data.data.user,
    onSuccess: (data) => {
      console.log(data, "require");
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
  });

  const loading = isLoading || isFetching;

  if (loading) {
    return <Loading />;
  }

  return (cookies.logged_in || user) &&
    allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : cookies.logged_in && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
