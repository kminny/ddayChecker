import React, { Component } from 'react';

import { graphql, MutationFunction } from 'react-apollo';
import { compose } from 'recompose';
import { GET_MESSAGES, UPLOAD_MESSAGE } from './queries/sharedQueries';

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
  showTimeType: string;
}

interface IProps {
  GetMessagesQuery: any;
  UploadMessageMutation: MutationFunction;
}

class App extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentDate: new Date(),
      startingDate: new Date('June 21, 2020 09:00:00'),
      dDay: new Date('Sep 27, 2020 09:00:00'),
      message: '',
      name: '',
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
    const { UploadMessageMutation, GetMessagesQuery } = this.props;
    const { message, name } = this.state;

    UploadMessageMutation({
      variables: {
        message,
        name,
      },
    }).then(() => {
      GetMessagesQuery.refetch();
    });

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
    const { GetMessagesQuery } = this.props;

    if (GetMessagesQuery.loading || !GetMessagesQuery.getMessages) {
      return <div>loading</div>;
    }

    const { messages } = GetMessagesQuery.getMessages;
    messages.sort((a: any, b: any) => {
      return b['id'] - a['id'];
    });

    const { currentDate, dDay, startingDate, message, name, showTimeType } = this.state;

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
                (showTimeType === 'day' && `${Math.floor(leftTime / 1000 / 60 / 60 / 24)} 일`)}
            </div>
          </p>

          <InputForm
            handleInputChange={this.handleInputChange}
            onSubmitButton={this.onSubmitButton}
            message={message}
            name={name}
          />
          {messages.map((message: any, index: number) => {
            return (
              <CardContainer
                message={message.message}
                name={message.name}
                createdAt={message.createdAt}
              />
            );
          })}
        </header>
      </div>
    );
  }
}

export default compose(
  graphql(GET_MESSAGES, {
    name: 'GetMessagesQuery',
  }),
  graphql(UPLOAD_MESSAGE, {
    name: 'UploadMessageMutation',
  })
)(App);
