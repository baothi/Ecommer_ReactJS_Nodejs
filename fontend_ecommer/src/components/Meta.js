import { Helmet } from "react-helmet";
import React from "react";

const Meta = (props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title} là tiêu đề</title>
    </Helmet>
  );
};

export default Meta;
