import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setTodo] = useState('');
  const [discarded, setDiscarded] = useState([]);
  const [finished, setFinished] = useState([]);

  const handleCheck = (id, time) => {
    const updatedToDos = toDos.map((obj) => {
      if (obj.id === id) {
        obj.status = true;
        obj.time = time;
        setFinished([...finished, obj]);
        return null;
      }
      return obj;
    });
    setToDos(updatedToDos.filter(obj => obj !== null));
  };

  return (
    <div className="app">
      <div className='to-do-list'>
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2>Whoop, it's {new Date().toLocaleDateString('en-US', { weekday: 'long' })} 🌝 ☕ </h2>

        </div>
        <div className="input">
          <input
            value={toDo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && toDo.length >= 1 && toDo.length <= 22) {
                const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                setToDos([...toDos, { id: Date.now(), text: toDo, status: false, time: currentTime }]);
                setTodo('');
              }
            }}
            type="text"
            placeholder="🖊️ Add item..."
          />
          <i onClick={() => {
            if (toDo.length >= 3 && toDo.length <= 22 ) {
              const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              setToDos([...toDos, { id: Date.now(), text: toDo, status: false, time: currentTime }]);
              setTodo('');
            }
          }} className="fas fa-plus"></i>
        </div>




      </div>

      <div className="lists-container">


        {/* Finished List */}
        <section className="finished-list">
          <div className="container">
            <div className="finished-list-border">
              <h1>Finished List</h1>
              <div className="todos">
                {finished.map((obj) => {
                  return (
                    <div className="todo finished-box" key={obj.id}>
                      <div className="left">
                        <p className='text-finished'>{obj.text}</p>


                      </div>
                      <div className="right">
                        <p className='time'>{obj.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Progress List */}
        <section className="progress-list">
          <div className="container">
            <div className="progress-list-border">
              <h1>Progress List</h1>
              <div className="todos">
                {toDos.map((obj) => {
                  return (
                    <div className="todo" key={obj.id}>
                      <div className="left">
                        <input className='checkbox-progress'
                          onChange={() => handleCheck(obj.id, new Date().toLocaleString())}
                          value={obj.status}
                          type="checkbox"
                          name=""
                          id=""
                          style={{color: "red"}}
                        />
                        <p className='text-progress'>{obj.text}</p>

                      </div>
                      <div className="right">
                        {obj.time && <p className='time'>{obj.time}</p>}
                        <i onClick={() => {
                          setToDos(toDos.filter(obj2 => obj2.id !== obj.id));
                          setDiscarded([...discarded, { id: Date.now(), text: obj.text, status: false, time: new Date().toLocaleString() }]);

                        }} className="fas fa-times"></i>

                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Discarded List */}
        <section className="discarded-list">
          <div className="container">
            <div className="discarded-list-border">
              <h1>Discarded List</h1>
              <div className="todos">
                {discarded.map((obj) => {
                  return (
                    <div className="todo discarded-box" key={obj.id}>
                      <div className="left">
                        <p className='text-discarded'>{obj.text}</p>

                      </div>
                      <div className="right">
                        <p className='time'>{obj.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
