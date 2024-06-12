import React, {useState} from 'react';
import './addModal.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const AddModal = (props) => {
    const { show, data, onAdd, onHide } = props;
    const [temperature, setTemperature] = useState('');

    const handleAdd = () => {
        onAdd({ ...data, temperature }); // 온도 값을 함께 전달
        handleCancel();
    }

    const handleCancel = () => {
        onHide();
    }

    const handleTemperatureChange = (event) => {
        setTemperature(event.target.value);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <Card.Title>음료의 온도</Card.Title>
                        <Card.Text>
                            <Form>
                                <div className="mb-3">
                                    <Form.Check
                                        type="radio"
                                        label="Hot"
                                        name="temperature"
                                        value="Hot"
                                        checked={temperature === 'Hot'}
                                        onChange={handleTemperatureChange}
                                        id="hotRadio"
                                    />

                                    <Form.Check
                                        type="radio"
                                        label="Cold"
                                        name="temperature"
                                        value="Cold"
                                        checked={temperature === 'Cold'}
                                        onChange={handleTemperatureChange}
                                        id="coldRadio"
                                    />
                                </div>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div>
                    <Button variant="secondary" onClick={handleCancel}>취소</Button>
                    <Button variant="primary" onClick={handleAdd}>확정</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddModal;
