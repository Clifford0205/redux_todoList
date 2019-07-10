import React from 'react';
import store from '../../store/index.js';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import {
  closeRegisterModal,
  modalInputChangeAction,
} from '../../store/actionCreators.js';

class StudentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(this.handleStoreChange);
    console.log(this.state);
  }

  handleStoreChange = () => {
    this.setState(store.getState());
    // console.log('store change');
  };

  // 處理跳出視窗的關閉
  handleModalClose = () => {
    const action = closeRegisterModal();
    store.dispatch(action);
  };

  handleModalFormInputChange = e => {
    // let value = event.target.value;
    // const name = event.target.name;

    // 注意：id(學號)與生日，需先轉為數字類型再進入state中
    // if (name === 'id' || name === 'birth') value = +value;
    const action = modalInputChangeAction(e.target.value, e.target.name);
    store.dispatch(action);

    // this.setState({ [name]: value });
  };

  handleBtnClick = () => {
    const action = {
      type: 'add_todo_item',
    };
    store.dispatch(action);
  };

  render() {
    return (
      <>
        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              學生資料 {this.state.disableIdField ? '編輯' : '新增'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  學號
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="id"
                // disabled={this.state.disableIdField}
                value={
                  /* 因為this.state預設為0，不要該數字0出現，應該是出現空白字串 */
                  this.state.id ? this.state.id : ''
                }
                onChange={this.handleModalFormInputChange}
              />
            </InputGroup>
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  姓名
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="name"
                value={this.state.name}
                onChange={this.handleModalFormInputChange}
              />
            </InputGroup>
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  出生年月日
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="birth"
                value={
                  /* 因為this.state預設為0，不要該數字0出現，應該是出現空白字串(第二種寫法) */
                  this.state.birth || ''
                }
                onChange={this.handleModalFormInputChange}
              />
            </InputGroup>
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.state.handleClose}>
              關閉
            </Button>
            <Button variant="primary" onClick={this.handleBtnClick}>
              儲存
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default StudentModal;
