import React, { useEffect, useState } from 'react';
import axios from "axios";
import { CardBody, Col, Container, Row } from "react-bootstrap";
import SearchedMenuList from "./components/SearchedMenuList";

const SearchV2 = ({ handleOpen }) => {
    const [ingredients, setIngredients] = useState(['주스', '커피', '우유', '차', '당도', '과일', '초콜릿']);
    const [ingredientBlocks, setIngredientBlocks] = useState([]);
    const [clickedIngredients, setClickedIngredients] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [menus, setMenus] = useState([]);
    const [visibilityToggle, setVisibilityToggle] = useState(true);
    const tempPort = "localhost:8000";

    useEffect(() => {
        setIsEmpty(clickedIngredients.length === 0);
    }, [clickedIngredients]);

    const toggleIngredient = (ingredient) => {
        setClickedIngredients(prevClickedIngredients =>
            prevClickedIngredients.includes(ingredient)
                ? prevClickedIngredients.filter(item => item !== ingredient)
                : [...prevClickedIngredients, ingredient]
        );
    };

    useEffect(() => {
        setIngredientBlocks(
            ingredients.map((ingredient, index) => {
                const isClicked = clickedIngredients.includes(ingredient);
                const blockBorder = isClicked ? "card rounded-4 col-md-auto border-3" : "card border-0 rounded-4 col-md-auto";
                return (
                    <div key={index} className={blockBorder} onClick={() => toggleIngredient(ingredient)}>
                        <div className="card-body"><h2>{ingredient}</h2></div>
                    </div>
                );
            })
        );
    }, [ingredients, clickedIngredients]);

    const goSearch = () => {
        if (!isEmpty) {
            const data = { ingredients: clickedIngredients };
            axios.post(`http://${tempPort}/fast/api/search`, data)
                .then(response => {
                    console.log('recommendation menus are successfully arrived! : ', response.data);
                    visibilityHandler();
                    setMenus(response.data);
                    //response.data === null 이면 "해당되는 메뉴가 없습니다!" 출력
                    
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const reset = () => {
        setClickedIngredients([]);
        setMenus([]);
        visibilityHandler();
    };

    const visibilityHandler = () => {
        setVisibilityToggle(!visibilityToggle);
        console.log('Visibility Toggle: ', !visibilityToggle);
    };

    return (
        <Container id="search">
            <Col className="text-center">
                {visibilityToggle && (
                    <Row>
                        <Row className="card rounded-5 rounded-bottom-0 bg-light border-0 shadow-sm">
                            <CardBody className="overflow-auto row justify-content-center">
                                <div className="d-flex flex-nowrap column-gap-3">
                                    {ingredientBlocks}
                                </div>
                            </CardBody>
                        </Row>
                        <Row className="card rounded-5 rounded-top-0 bg-info-subtle border-0 shadow-sm" onClick={goSearch}>
                            <CardBody className="overflow-auto row justify-content-center">
                                <h3>선택한 재료가 포함되는 모든 메뉴 검색</h3>
                            </CardBody>
                        </Row>
                    </Row>
                )}
                {!visibilityToggle && (
                    <Row>
                        <button className="btn btn-info rounded-4" type="button" onClick={reset}>
                            <h3>다시 검색</h3>
                        </button>
                        {menus && menus.menuList && menus.menuList.length > 0 ? (
                            <SearchedMenuList menus={menus} handleOpen={handleOpen} />
                        ) : (
                            <p><h1>해당되는 메뉴가 없습니다!</h1></p>
                        )}
                    </Row>
                )}
            </Col>
        </Container>
    );
};

export default SearchV2;
