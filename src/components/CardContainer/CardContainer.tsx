import React from 'react';
import { Card, CardBody } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/ko';

interface IProps {
  message: string;
  name: string;
  createdAt: Date;
}

const CardContainer = (props: IProps) => {
  const { message, name, createdAt } = props;
  return (
    <>
      <Card>
        <CardBody>
          <blockquote className="blockquote blockquote-primary mb-0">
            <p>{message}</p>
            <footer className="blockquote-footer">
              {name}, {moment(createdAt).format('YY/MM/DD hh:mm')}
            </footer>
          </blockquote>
        </CardBody>
      </Card>
    </>
  );
};

export default CardContainer;
