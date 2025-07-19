import React, { useRef } from 'react';

type CategoriesProps = {
    value: number;
    onClickCategory: any
};

export const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
    const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    return (
        <div className="categories">
            <ul>
                {categories.map((name, i) => (
                    <li
                        key={i}
                        ref={(el) => {
                            itemRefs.current[i] = el
                        }}
                        className={value === i ? 'active' : ''}
                        onClick={() => onClickCategory(i)}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
