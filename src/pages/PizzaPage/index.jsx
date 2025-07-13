import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PizzaPage.scss';

import { NotFoundPage } from '../NotFoundPage';
import { useDispatch } from 'react-redux';
import { fetchPizza } from '../../redux/slices/pizzaSlice';

const typeNames = ['thin', 'traditional'];


const getStarRating = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? true : false;
    return (
        <div className="pizza-rating">
            {[...Array(fullStars)].map((_, i) => (
                <span key={i}>★</span>
            ))}
            {halfStar && <span>½</span>}
            {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
                <span key={i}>☆</span>
            ))}
        </div>
    );
};

const PizzaPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [pizza, setPizza] = useState(null);

    useEffect(() => {
        dispatch(fetchPizza({ id })).then(({ payload }) => setPizza(payload));
    }, [dispatch, id]);

    const [activeTypeIndex, setActiveTypeIndex] = useState(0);
    const [activeSizeIndex, setActiveSizeIndex] = useState(0);

    if (!pizza) {
        return <NotFoundPage />;
    }

    return (
        <div className="pizza-page container">
            <div className="pizza-details">
                <img src={pizza.imageUrl} alt={pizza.name} className="pizza-image" />
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
                    {getStarRating(pizza.rating)}

                    <div className="pizza-footer">
                        <span className="pizza-price">от {pizza.price} ₽</span>
                        <button className="add-to-cart">Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaPage;
