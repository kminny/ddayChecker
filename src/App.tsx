import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [dDay, setDDay] = useState(new Date("June 21, 2020 09:00:00").toLocaleString())
  const [date, setDate] = useState(new Date().getUTCDate())
  const [hour, setHours] = useState(new Date().getHours())
  const [minutes, setMinutes] = useState(new Date().getMinutes())
  const [seconds, setSeconds] = useState(new Date().getSeconds())
  const [milliSeconds, setMilliSeconds] = useState(new Date().getMilliseconds());
  const [messages, setMessages] = useState([""])
  const [message, setMessage] = useState("")

  useEffect(() => {
    let timerId = setInterval(() => tick(), 10)

    return function cleanup() {
      clearInterval(timerId)
    }
  }, [])

  function tick(): void {
    setDate(new Date().getDate())
    setHours(new Date().getHours())
    setMinutes(new Date().getMinutes())
    setSeconds(new Date().getSeconds())
    setMilliSeconds(new Date().getMilliseconds())
  }

  function inputHandler(event:React.ChangeEvent<HTMLInputElement>): void {
    const {value, name} = event.target

    setMessage(value)
  }

  function messageInputButtonClickHandler(): void {
    messages.push(message)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{dDay}</p>
        <p>time: {date}일{hour}시간{minutes}분{seconds}초.{milliSeconds}</p>
        <p>message: {messages.map(message => `${message} `)}</p>
        <p>
            <input name="message" onChange={inputHandler}></input>
            <button onClick={messageInputButtonClickHandler}>입력</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
