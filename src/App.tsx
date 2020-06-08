import React, { Component } from 'react';
import { Button } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

import CardContainer from './components/CardContainer';
import DropDownMenu from './components/DropDownMenu';
import InputForm from './components/InputForm';
import ProgressBar from './components/ProgressBar';

interface IState {
  dDay: Date;
  currentDate: Date;
  startingDate: Date;
  message: string;
  name: string;
  messages: string[];
  names: string[];
  showTimeType: string;
}

interface IProps {}

class App extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentDate: new Date(),
      startingDate: new Date('June 7, 2020 09:00:00'),
      dDay: new Date('June 21, 2020 09:00:00'),
      message: '',
      name: '',
      messages: [],
      names: [],
      showTimeType: 'millisecond',
    };
  }

  componentDidMount() {
    let timerId = setInterval(() => this.tick(), 10);

    return function cleanup() {
      clearInterval(timerId);
    };
  }

  tick = (): void => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentDate: new Date(),
      };
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value, name },
    } = event;

    this.setState({
      [name]: value,
    } as any);
  };

  onSubmitButton = () => {
    const { message, name } = this.state;

    this.state.messages.push(message);
    this.state.names.push(name);

    this.setState({
      message: '',
      name: '',
    });
  };

  onShowTimeChangeHandler = (type: string) => {
    this.setState({
      showTimeType: type,
    });
  };

  render() {
    const {
      currentDate,
      dDay,
      startingDate,
      messages,
      names,
      message,
      name,
      showTimeType,
    } = this.state;

    const leftTime: number = dDay.getTime() - currentDate.getTime();
    const leftTimePercentage =
      ((currentDate.getTime() - startingDate.getTime()) /
        (dDay.getTime() - startingDate.getTime())) *
      100;

    return (
      <div className="App">
        <header className="App-header">
          <p>시험 날짜: {dDay.toLocaleString()}</p>
          <ProgressBar value={leftTimePercentage} />
          <DropDownMenu onShowTimeChangeHandler={this.onShowTimeChangeHandler} />
          <p>
            남은 시간({showTimeType}):{' '}
            <div>
              {(showTimeType === 'millisecond' && `${leftTime} 밀리초`) ||
                (showTimeType === 'second' && `${Math.floor(leftTime / 1000)} 초`) ||
                (showTimeType === 'minute' && `${Math.floor(leftTime / 1000 / 60)} 분`) ||
                (showTimeType === 'hour' && `${Math.floor(leftTime / 1000 / 60 / 60)} 시간`) ||
                (showTimeType === 'day' && `${dDay.getDate() - currentDate.getDate()} 일`)}
            </div>
          </p>
          {/* <p>message: {messages.map((message) => `${message} `)}</p> */}
          <p>
            {/* <input name="message" onChange={inputHandler}></input>
            <button onClick={messageInputButtonClickHandler}>입력</button> */}
          </p>
          <InputForm
            handleInputChange={this.handleInputChange}
            onSubmitButton={this.onSubmitButton}
            message={message}
            name={name}
          />
          {messages.map((message, index) => {
            return <CardContainer message={message} name={names[index]} />;
          })}

          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </header>
      </div>
    );
  }
}

export default App;
