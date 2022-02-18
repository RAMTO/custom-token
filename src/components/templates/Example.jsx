import React from 'react';

const Example = ({ children, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div className="row mt-4">
        <div className="col-md-8 col-lg-7 col-xl-6">{children}</div>
      </div>
    </div>
  );
};

export default Example;
