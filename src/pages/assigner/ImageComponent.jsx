import React from "react";
import _ from "lodash";
const ImageComponent = ({ selectedPainting }) => {
  return <img alt="paint" src={_.get(_.head(_.get(selectedPainting, "originalImage")), "url", "")} />;
};

export default ImageComponent;
