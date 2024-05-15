import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {CardBody, Col, Container, Row, Button, Card} from "react-bootstrap";

const SearchV2 = () => {
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState(['주스', '커피', '우유', '차', '당도', '과일', '초콜릿']);
    const [ingredientBlocks, setIngredientBlocks] = useState(ingredients);
    const [clickedIngredients, setClickedIngredients] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        clickedIngredients.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
    }, [clickedIngredients]);

    const toggleIngredient = (ingredient) => {
        // 클릭된 재료 목록에 이미 포함되어 있는지 확인
        const isClicked = clickedIngredients.includes(ingredient);
        if (isClicked) {
            setClickedIngredients(prevClickedIngredients => prevClickedIngredients.filter(item => item !== ingredient));
        } else {
            setClickedIngredients(prevClickedIngredients => [...prevClickedIngredients, ingredient]);
        }
    };

    useEffect(() => {
        const updatedBlocks = ingredients.map((ingredient) => {
            // 클릭된 재료인지 확인
            const isClicked = clickedIngredients.includes(ingredient);
            // 클릭된 재료인 경우 border 추가, 아닌 경우 border 없음
            const blockBorder = isClicked ? "card rounded-4 col-md-auto border-3" : "card border-0 rounded-4 col-md-auto";
            return (
                <div className={blockBorder} onClick={() => toggleIngredient(ingredient)}>
                    <div className="card-body"><h2>{ingredient}</h2></div>
                </div>
            );
        });
        setIngredientBlocks(updatedBlocks);
    }, [ingredients, clickedIngredients]);


    const goSearch = () => {
        // 클릭된 재료 없을 때 검색 안되게 추가
        if(!isEmpty) {
            const data = {
                "ingredients": clickedIngredients
            }
            axios.post('http://localhost:8000/fast/api/search', data)
                .then(response => {
                    console.log('recommendation menus are successfully arrived! : ', response.data);
                    navigate("/search-order",{
                        state: {menus: response.data}
                    });

                })
                .catch(error => {
                    console.log(error);
                })
        }

    }




    return (
        <Container id="search">

            <Col className="text-center">

                {/* 검색에 추가할 재료 선택 */}
                <Card className="row rounded-5 rounded-bottom-0 bg-light border-0 shadow-sm">
                    <CardBody className="overflow-auto row justify-content-center">
                        <div className="d-flex flex-nowrap column-gap-3">
                            {/* 재료 블록 */}
                            {ingredientBlocks}
                        </div>
                    </CardBody>
                </Card>

                <Card className="row rounded-5 rounded-top-0 bg-info-subtle border-0 shadow-sm" onClick={goSearch}>
                    <CardBody className="overflow-auto row justify-content-center">
                        <h3>선택한 재료가 포함되는 모든 메뉴 검색</h3>
                    </CardBody>
                </Card>
            </Col>

        </Container>

    );
};

export default SearchV2;