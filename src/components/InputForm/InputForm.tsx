import React, { ChangeEvent } from 'react';
import { FormGroup, Input, Button } from 'reactstrap';
import './inputForm.css';

interface IProps {
  handleInputChange: (event: ChangeEvent<any>) => void;
  onSubmitButton: any;
  name: string;
  message: string;
}

const InputForm = (props: IProps) => {
  const { handleInputChange, onSubmitButton, message, name } = props;

  return (
    <>
      <FormGroup>
        <label htmlFor="name">이름</label>
        <Input
          id="name"
          name="name"
          placeholder="이름을 입력하세요"
          type="text"
          value={name}
          onChange={handleInputChange}
        ></Input>
        {/* <FormText className="text-muted" color="default" id="emailHelp">
            We'll never share your email with anyone else.
          </FormText> */}
      </FormGroup>
      <FormGroup>
        <label htmlFor="name">메세지</label>
        <Input
          id="message"
          name="message"
          placeholder="메세지를 입력하세요"
          type="text"
          value={message}
          onChange={handleInputChange}
        ></Input>
      </FormGroup>
      <FormGroup check></FormGroup>
      <Button
        disabled={!message || !name}
        id="submitButton"
        color="primary"
        type="submit"
        onClick={onSubmitButton}
      >
        메세지 남기기
      </Button>
    </>
  );
};

export default InputForm;
