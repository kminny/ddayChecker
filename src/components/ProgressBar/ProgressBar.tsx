import React from 'react';
import { Progress } from 'reactstrap';
import styled from 'styled-components';

const StartingDate = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProgressBar = (props: any) => {
  const { value } = props;
  value.toFixed(2);

  return (
    <>
      <div className="progress-container progress-info">
        <StartingDate className="progress-badge">2020.6.21</StartingDate>
        <span className="progress-badge">진행상황 ( {value.toFixed(4)}% )</span>
        <Progress max="100" value={value.toFixed(2)}>
          <span className="progress-value">2020.9.27</span>
        </Progress>
      </div>
    </>
  );
};

export default ProgressBar;
