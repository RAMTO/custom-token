import React, { useState } from 'react';
import Example from '../templates/Example';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Example title="✅ Basic Counter">
      <div className="card p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4>
            <span className="fw-bold">Count:</span> {count}
          </h4>
          <div className="d-flex">
            <button onClick={() => setCount(count + 1)} className="btn btn-primary">
              +
            </button>
            <button
              onClick={() => setCount(prevCount => prevCount - 1)}
              className="btn btn-secondary ms-2"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </Example>
  );
};

export default Counter;
