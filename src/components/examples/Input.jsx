import React, { useState } from 'react';
import Example from '../templates/Example';

const Input = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Example title="⌨️ Basic Input">
      <input
        onChange={e => setInputValue(e.target.value)}
        value={inputValue}
        type="text"
        className="form-control"
      />
    </Example>
  );
};

export default Input;
