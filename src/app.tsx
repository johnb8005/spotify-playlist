import { Route, Routes } from "react-router-dom";

import Login from "./login";
import NotFound from "./not-found";

import SSORedirect from "./sso-redirect.js";
import Spotify from "./spotify.js";

export default () => {
  return (
    <Routes>
      <Route path={""} element={<Login />} />
      <Route path={"/app"} element={<Spotify />} />
      <Route path={"/sso/redirect"} element={<SSORedirect />} />
      <Route path={"/:any"} element={<NotFound />} />
    </Routes>
  );
};
