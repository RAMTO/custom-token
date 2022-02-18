import React, { useState } from 'react';
import Example from '../templates/Example';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);

  const addToList = () => {
    if (inputValue === '') return;

    const newItem = {
      title: inputValue,
      done: false,
    };

    setTodoList([...todoList, newItem]);

    // Clear input value
    setInputValue('');
  };

  const toggleListItem = index => {
    const updatedList = todoList.map((item, _index) =>
      index === _index ? { ...item, done: !item.done } : item,
    );

    setTodoList(updatedList);
  };

  const removeItem = index => {
    const updatedList = todoList.filter((item, _index) => index !== _index);
    setTodoList(updatedList);
  };

  const listTemplate = (item, index) => (
    <div key={index} className="list-item d-flex justify-content-between">
      <span onClick={() => toggleListItem(index)}>
        {item.done ? <span className="me-2">✅</span> : null}
        <span className={item.done ? `text-decoration-line-through` : null}>{item.title}</span>
      </span>
      <span className="me-2" onClick={() => removeItem(index)}>
        ❌
      </span>
    </div>
  );

  const renderList = () => {
    return todoList.length > 0 ? (
      todoList.map(listTemplate)
    ) : (
      <p className="text-center">No items in list</p>
    );
  };

  return (
    <Example title="✅ Todo List">
      <div className="d-flex align-items-center">
        <input
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          className="form-control me-2"
        />
        <button onClick={() => addToList()} className="btn btn-primary">
          Add to list
        </button>
      </div>
      <div className="mt-4">{renderList()}</div>
    </Example>
  );
};

export default TodoList;
