import React, { useState } from 'react';
import Example from '../templates/Example';

const initialState = [
  {
    name: 'Martin',
    age: 34,
    isTeacher: true,
  },
  {
    name: 'Bob',
    age: 25,
    isTeacher: false,
  },
  {
    name: 'Alice',
    age: 20,
    isTeacher: false,
  },
];

const MultipleObjects = () => {
  const [people, setPeople] = useState(initialState);

  const removeItem = indexToRemove => {
    const updatedArray = people.filter((_, index) => index !== indexToRemove);
    setPeople(updatedArray);
  };

  const templatePeople = (item, index) => (
    <div className="card p-2 my-2" key={index}>
      <div className="d-flex justify-content-between align-items-center">
        <p>
          <span className="fw-bold">Name:</span> {item.name}
        </p>
        <span className="cursor-pointer" onClick={() => removeItem(index)}>
          ❌
        </span>
      </div>
      <p>
        <span className="fw-bold">Age:</span> {item.age}
      </p>
      <p style={{ fontSize: '30px' }}>{item.isTeacher ? <span>🤓</span> : <span>🥳</span>}</p>
    </div>
  );

  const renderPeople = people =>
    people.length > 0 ? (
      <div>{people.map(templatePeople)}</div>
    ) : (
      <h4 className="text-center">No people</h4>
    );

  return <Example title="Multiple Objects">{renderPeople(people)}</Example>;
};

export default MultipleObjects;
