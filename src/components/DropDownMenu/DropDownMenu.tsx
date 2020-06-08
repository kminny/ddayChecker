import React from 'react';
import {
  Button,
  ButtonGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap';

interface IProps {
  onShowTimeChangeHandler: any;
}

const DropDownMenu = (props: IProps) => {
  const { onShowTimeChangeHandler } = props;

  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle
          aria-expanded={false}
          aria-haspopup={true}
          caret
          color="info"
          data-toggle="dropdown"
          id="dropdownMenuButton"
          type="button"
        >
          남은 시간 표시
        </DropdownToggle>
        <DropdownMenu aria-labelledby="dropdownMenuButton">
          <DropdownItem href="#pablo" onClick={() => onShowTimeChangeHandler('millisecond')}>
            millisecond
          </DropdownItem>
          <DropdownItem href="#pablo" onClick={() => onShowTimeChangeHandler('second')}>
            second
          </DropdownItem>
          <DropdownItem href="#pablo" onClick={() => onShowTimeChangeHandler('minute')}>
            minute
          </DropdownItem>
          <DropdownItem href="#pablo" onClick={() => onShowTimeChangeHandler('hour')}>
            hour
          </DropdownItem>
          <DropdownItem href="#pablo" onClick={() => onShowTimeChangeHandler('day')}>
            day
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default DropDownMenu;
