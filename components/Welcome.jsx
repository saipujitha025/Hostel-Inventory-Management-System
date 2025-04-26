import React from "react";

const Welcome = ({ currentUser }) => {
  return <div>{currentUser.email}</div>;
};

export default Welcome;
