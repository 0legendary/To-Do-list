import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setTodo] = useState('');
  const [scheduled, setScheduled] = useState([]);

  return (
    <div className="app">
      <div className='to-do-list'>
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
        </div>
        <div className="input">
          <input value={toDo} onChange={(e) => setTodo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
          <i onClick={() => setToDos([...toDos, { id: Date.now(), text: toDo, status: false }])} className="fas fa-plus"></i>
        </div>

      </div>
      <div class="lists-container">

        {/* Finished list */}
        <section class="finished-list">
          <div class="container">
            <div class="finished-list-border">
              <h1>Finished List</h1>
              {toDos.map((obj) => {
                if (obj.status) {
                  return (<h1>{obj.text}</h1>)
                }
                return null
              })}
            </div>
          </div>
        </section>

        {/* Progress list */}
        <section class="progress-list">
          <div class="container">
            <div class="progress-list-border">
              <h1>Progress List</h1>

              <div className="todos">
                {
                  toDos.map((obj) => {

                    return (
                      <div className="todo">
                        <div className="left">
                          <input
                            onChange={(e) => {
                              setToDos(toDos.map((obj2) => {
                                if (obj2.id === obj.id) {
                                  obj2.status = e.target.checked
                                }
                                return obj2
                              }));
                            }}
                            value={obj.status}
                            type="checkbox"
                            name=""
                            id=""
                          />
                          <p>{obj.text}</p>
                        </div>
                        <div className="right">
                          <i onClick={() => {
                            setToDos(toDos.filter(obj2 => obj2.id !== obj.id));
                            setScheduled([...scheduled, { id: Date.now(), text: obj.text, status: false }]);
                          }} className="fas fa-times"></i>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

            </div>
          </div>
        </section>

        {/* Scheduled list */}
        <section class="scheduled-list">
          <div class="container">
            <div class="scheduled-list-border">
              <h1>Scheduled List</h1>
              {scheduled.map((obj) => {
                return (<h1>{obj.text}</h1>)
              })}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;
