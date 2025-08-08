import React, { useRef } from 'react';
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";
import {useAppDispatch} from "../redux/store";
import {categories} from "../utils/consts";

type CategoriesProps = {
    value: number;
};

export const Categories = React.memo((props: CategoriesProps) => {


    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const dispatch = useAppDispatch();


    const onChangeCategory = React.useCallback((i: number) => {
        dispatch(setCategoryId(i));
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    return (
        <div className="categories">
            <ul>
                {categories.map((name, i) => (
                    <li
                        key={i}
                        ref={(el) => {
                            itemRefs.current[i] = el
                        }}
                        className={props.value === i ? 'active' : ''}
                        onClick={() => onChangeCategory(i)}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
});
