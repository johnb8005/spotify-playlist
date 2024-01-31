import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from "./login";
import NotFound from "./not-found";

import React from "react";

const SSORedirect = () => {
  const s = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const navigate = useNavigate();

  if (!code) {
    return <p>Code expected, aborting</p>;
  }

  fetch("/api/spotify/sso/redirect?code=" + code).then((x) => {
    navigate("/app");
  });

  console.log(s);
  return <p>sdf {code}</p>;
};

export default SSORedirect;
