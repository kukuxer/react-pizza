import { useRef } from 'react';

export function Categories({ value, onClickCategory }) {
    const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];
    const itemRefs = useRef([]);

    return (
        <div className="categories">
            <ul>
                {categories.map((name, i) => (
                    <li
                        key={i}
                        ref={(el) => (itemRefs.current[i] = el)}
                        className={value === i ? 'active' : ''}
                        onClick={() => onClickCategory(i)}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
