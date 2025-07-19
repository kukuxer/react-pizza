import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './PizzaPage.scss';

import {NotFoundPage} from '../NotFoundPage';
import {fetchPizza} from '../../redux/slices/pizzaSlice';
import {getStarRating} from "./getStarRating";
import {Pizza} from "../../entity/Pizza";
import {useAppDispatch} from "../../redux/store";
import {addProduct} from "../../redux/slices/cartSlice";
import Loading from "../../components/Loading";

const typeNames = ['thin', 'traditional'];


const PizzaPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();
    const [pizza, setPizza] = useState<Pizza>();

    const [activeTypeIndex, setActiveTypeIndex] = useState(0);
    const [activeSizeIndex, setActiveSizeIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        dispatch(fetchPizza({id})).then(({payload}) => {
            setLoading(false);
            setPizza(payload)
        });

    }, [dispatch, id]);


    if (loading) return (
        <Loading/>
    )

    if (!pizza) return <NotFoundPage/>;


    return (
        <div className="pizza-page container">
            <div className="pizza-details">
                <img src={pizza.imageUrl} alt={pizza.name} className="pizza-image"/>
                <div className="pizza-info">
                    <h1 className="pizza-title">{pizza.name}</h1>
                    <div className="pizza-selectors">
                        <ul className="type-selector">
                            {typeNames.map((type, i) => (
                                <li
                                    key={type}
                                    onClick={() => setActiveTypeIndex(i)}
                                    className={
                                        pizza?.types?.includes(i)
                                            ? activeTypeIndex === i
                                                ? 'active'
                                                : ''
                                            : 'disabled'
                                    }
                                >
                                    {type}
                                </li>
                            ))}
                        </ul>

                        <ul className="size-selector">
                            {pizza.sizes.map((size) => (
                                <li
                                    key={size}
                                    onClick={() => setActiveSizeIndex(size)}
                                    className={
                                        pizza?.sizes.includes(size)
                                            ? activeSizeIndex === size
                                                ? 'active'
                                                : ''
                                            : 'disabled'
                                    }
                                >
                                    {size} см
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h4 className="pizza-description">{`Try our delicious ${pizza.name.toLowerCase()} made with premium ingredients and baked to perfection.`}</h4>
                    {getStarRating({rating: pizza.rating})}
                    <div className="pizza-footer">
                        <span className="pizza-price">от {pizza.price} ₽</span>
                        <button onClick={() => dispatch(addProduct(pizza))} className="add-to-cart">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaPage;
