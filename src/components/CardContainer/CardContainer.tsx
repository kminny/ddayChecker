import React from 'react';
import { Card, CardBody } from 'reactstrap';

interface IProps {
  message: string;
  name: string;
}

const CardContainer = (props: IProps) => {
  const { message, name } = props;
  return (
    <>
      <Card>
        <CardBody>
          <blockquote className="blockquote blockquote-primary mb-0">
            <p>{message}</p>
            <footer className="blockquote-footer">{name}</footer>
          </blockquote>
        </CardBody>
      </Card>
    </>
  );
};

export default CardContainer;
