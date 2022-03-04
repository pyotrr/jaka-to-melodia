import React from "react";
import Loading from "../../layout/Loading";
import useLogOut from "../../../utils/hooks/useLogOut";

const Logout: React.FC = () => {
  useLogOut();
  return <Loading />;
};

export default Logout;
