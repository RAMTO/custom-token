import React, { useState } from 'react';
import Example from '../templates/Example';

const SingleObject = () => {
  const [person, setPerson] = useState({
    name: 'Martin',
    age: 34,
    isTeacher: true,
  });

  return (
    <Example title="🙍🏻‍♂️ Single Object">
      <div className="card p-4">
        <div className="row">
          <div className="col-6">
            <h2>Person</h2>
            <p>
              <span className="fw-bold">Name:</span> {person.name}
            </p>
            <p>
              <span className="fw-bold">Age:</span> {person.age}
            </p>
            <p style={{ fontSize: '30px' }}>
              {person.isTeacher ? <span>🤓</span> : <span>🥳</span>}
            </p>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Name:</label>
              <input
                className="form-control"
                onChange={e =>
                  setPerson({
                    ...person,
                    name: e.target.value,
                  })
                }
                type="text"
                value={person.name}
              />
            </div>

            <div className="form-group mt-3">
              <label>Age:</label>
              <input
                className="form-control"
                onChange={e =>
                  setPerson({
                    ...person,
                    age: e.target.value,
                  })
                }
                type="text"
                value={person.age}
              />
            </div>

            <div className="form-group mt-3">
              <div className="d-flex align-items-center">
                <label className="me-1">Is teacher:</label>
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    setPerson({
                      ...person,
                      isTeacher: !person.isTeacher,
                    })
                  }
                >
                  {person.isTeacher ? <span>✅</span> : <span>❌</span>}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Example>
  );
};

export default SingleObject;
