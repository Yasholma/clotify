import React from "react";
import { Outlet } from "react-router-dom";
import Directory from "../../components/directory/directory.component";

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Outlet />
      <Directory />
    </>
  );
};

export default Home;
