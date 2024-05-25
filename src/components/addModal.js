import React, { useState } from 'react';
import './addModal.css';
import Pic from '../assets/images/americano.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {Image} from "react-bootstrap";
import {Flex, Radio} from "antd";
import {useNavigate} from "react-router-dom";


const AddModal = (props) => {
    const navigate = useNavigate();

    const { show, data, onAdd, onHide } = props;

    const handleAdd = () => {
        onAdd(data);
        handleCancel();
    }

    const handleCancel = () => {
        onHide();
    }
    const [temperature, setTemperature] = useState('');

    const handleTemperatureChange1 = (event) => {
        debugger
        data.temperature = 'Hot'
        setTemperature('Hot');
    };
    const handleTemperatureChange2 = (event) => {
        data.temperature = 'Cold'
        setTemperature('Cold');
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="media">
                    <div className="media-left" href="#">
                        <Image class="avatarImg" src={Pic} style={{width: 100, height: 'auto'}} responsive></Image>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading truncate-title">{data.name}</h4>
                        <h6 className="media-heading truncate-title">{data.name}</h6>
                        <span style={{color: 'red'}}>{data.price}￦</span>
                    </div>
                </div>

                <div style={{textAlign:"center"}}>음료의 온도</div>

                <Card>
                    <Card.Body>
                        <Card.Title>음료의 온도</Card.Title>
                        <Card.Text>
                            <Form>


                                        <Flex vertical gap="middle">
                                            <Radio.Group size="large"  defaultValue="Hot" buttonStyle="solid">
                                                <Radio.Button className="custom-radio-button"  style={{width:100,textAlign:"center"}}   size="large"  value="Hot" onClick={ handleTemperatureChange1}>Hot</Radio.Button>
                                                <Radio.Button style={{width:100,textAlign:"center"}}   value="Cold" onClick={ handleTemperatureChange2}>Cold</Radio.Button>
                                            </Radio.Group>
                                        </Flex>





                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <div style={{float: "right"}}>
                    <Button variant="secondary" onClick={handleCancel}>취소</Button>
                    <Button variant="primary" onClick={handleAdd}>확정</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
        ;
}

export default AddModal;
