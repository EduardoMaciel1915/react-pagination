import React, { Fragment } from 'react';

const RenderCondition = ({ children, condition }: any) => {
  if (!condition) return <Fragment></Fragment>;
  return children;
};

export default RenderCondition;
