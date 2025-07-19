import React, {useMemo, useState} from 'react'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {addProduct} from "../../redux/slices/cartSlice";
import {selectCartItemById} from "../../redux/slices/pizzaSlice";
import {Pizza} from "../../entity/Pizza";
import {useAppDispatch} from "../../redux/store";

export const PizzaBlock: React.FC<{ product: Pizza }> = ({product}) => {
    const selectItem = useMemo(() => selectCartItemById(product.id), [product.id]);
    const cartItem = useSelector(selectItem);

    const addedCount = cartItem ? cartItem.count : 0;
    const [activeTypeIndex, setActiveTypeIndex] = useState(
        product.types.length > 0 ? product.types[0] : 0
    );
    const [activeSizeIndex, setActiveSizeIndex] = useState(0);
    const typeNames = ["thin", "traditional"];
    const dispatch = useAppDispatch();
    const onClickAdd = () => {

        const item = {
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            types: typeNames[activeTypeIndex],
            size: product.sizes[activeSizeIndex]
        }
        dispatch(addProduct(item))
    }


    return (

        <div className="pizza-block">
            <Link to={`/pizza/${product.id}`}>
                <img
                    className="pizza-block__image"
                    src={product.imageUrl}
                    alt="Pizza"
                />
            </Link>
                <h4 className="pizza-block__title">{product.name}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            product.types.map((i) => (
                                <li key={i} className={activeTypeIndex === i ? "active" : ""}
                                    onClick={() => setActiveTypeIndex(i)}>
                                    {typeNames[i]}
                                </li>
                            ))
                        }
                    </ul>
                    <ul>
                        {product.sizes.map((size, index) => (
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
                <div className="pizza-block__price">from {product.price} $</div>
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

    )
}