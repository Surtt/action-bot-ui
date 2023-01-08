import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "antd/dist/reset.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import Loading from "./copmponents/Loading";
import { queryClient } from "./react-query/queryClient";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       refetchOnMount: false,
//       refetchOnReconnect: false,
//       retry: 1,
//       staleTime: 5 * 1000,
//     },
//   },
// });

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Loading />
    </>
  );
}

export default App;
