import React, {useState, useEffect} from 'react';
import axios from "axios";

const SearchComponent = () => {
    const [ingredients, setIngredients] = useState(['주스', '커피', '우유', '차', '당도', '과일', '초콜릿']);
    const [ingredientBlocks, setIngredientBlocks] = useState(ingredients);
    const [clickedIngredients, setClickedIngredients] = useState([]);
    const [clickedIngredientBlocks, setClickedIngredientBlocks] = useState([]);

    useEffect(() => {
        const ingredientsElements = ingredients.map((ingredient) => (
            <div className="card border-0 rounded-4 col-md-auto" onClick={() => toggleIngredient(ingredient)}>
                <div className="card-body">{ingredient}</div>
            </div>
        ));
        setIngredientBlocks(ingredientsElements);
    }, [ingredients]);

    useEffect(() => {
        const clickedIngredientElements = clickedIngredients.map((clickedIngredient) => (
            <div className="card bg-primary-subtle border-0 rounded-4 col-md-auto" onClick={() => toggleIngredient(clickedIngredient)}>
                <div className="card-body">{clickedIngredient}</div>
            </div>
        ))
        setClickedIngredientBlocks(clickedIngredientElements);
    }, [clickedIngredients]);

    /// 클릭된 재료를 추가하거나 제거하는 함수
    const toggleIngredient = (ingredient) => {
        // 클릭된 재료 목록에 이미 포함되어 있는지 확인
        const isClicked = clickedIngredients.includes(ingredient);

        // 클릭된 재료 목록에 포함되어 있으면 제거, 그렇지 않으면 추가
        if (isClicked) {
            // 클릭된 재료 제거
            setClickedIngredients(prevClickedIngredients => prevClickedIngredients.filter(item => item !== ingredient));
            // 클린된 재료 재료 리스트에 추가
            setIngredients(prevIngredients => [...prevIngredients, ingredient]);
        } else {
            // 클릭된 재료 추가
            setClickedIngredients(prevClickedIngredients => [...prevClickedIngredients, ingredient]);
            // 재료 리스트에서 클릭된 재료 제거
            setIngredients(prevIngredients => prevIngredients.filter(item => item !== ingredient));
        }
    };

    const goSearch = () => {
        //const data = JSON.stringify(clickedIngredients);
        const data2 = {
            "ingredients": clickedIngredients
        }
        axios.post('http://localhost:8000/fast/api/search', data2)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })

    }




    return (
        <div className="container">
            {/* 검색어 생성 */}
            <div className="card row rounded-4 bg-light border-0">
                <div className="card-body row column-gap-2 justify-content-center">
                    {/* 클릭된 재료 블룩 */}
                    {clickedIngredientBlocks}
                    <div className="card border-0 rounded-4 col-md-auto">
                        <div className="card-body" onClick={goSearch}>가 들어간 메뉴를 검색</div>
                    </div>
                </div>
            </div>
            {/* 검색에 추가할 재료 선택 */}
            <div className="card row rounded-4 bg-light">
                <div className="card-body overflow-auto row justify-content-center">
                    <div className="d-flex flex-nowrap column-gap-2">
                        {/* 재료 블록 */}
                        {ingredientBlocks}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;