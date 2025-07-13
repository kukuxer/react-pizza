import React, {useMemo, useState} from 'react'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../redux/slices/cartSlice";
import {selectCartItemById} from "../../redux/slices/pizzaSlice";

export function PizzaBlock(props) {
    // const cartItem = useSelector(selectCartItemById(props.product.id));
    const selectItem = useMemo(() => selectCartItemById(props.product.id), [props.product.id]);
    const cartItem = useSelector(selectItem);

    const addedCount = cartItem ? cartItem.count : 0;
    const [activeTypeIndex, setActiveTypeIndex] = useState(
        props.product.types.length > 0 ? props.product.types[0] : 0
    );
    const [activeSizeIndex, setActiveSizeIndex] = useState(0);
    const typeNames = ["thin", "traditional"];
    const dispatch = useDispatch()
    const onClickAdd = () => {

        const item = {
            id: props.product.id,
            title: props.product.name,
            imageUrl: props.product.imageUrl,
            price: props.product.price,
            type: typeNames[activeTypeIndex],
            size: props.product.sizes[activeSizeIndex]
        }
        dispatch(addProduct(item))
    }


    return (
        <Link to={`/pizza/${props.product.id}`}>
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={props.product.imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{props.product.name}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            props.product.types.map((i) => (
                                <li key={i} className={activeTypeIndex === i ? "active" : ""}
                                    onClick={() => setActiveTypeIndex(i)}>
                                    {typeNames[i]}
                                </li>
                            ))
                        }
                    </ul>
                    <ul>
                        {props.product.sizes.map((size, index) => (
                            <li
                                key={size}
                                className={activeSizeIndex === index ? "active" : ""}
                                onClick={() => setActiveSizeIndex(index)}
                            >
                                {size} cm
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">from {props.product.price} $</div>
                    <button onClick={onClickAdd} className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Add</span>
                        <i>{addedCount}</i>
                    </button>
                </div>
            </div>
        </Link>
    )
}