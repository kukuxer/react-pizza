import React, { JSX } from "react";

interface StarRatingProps {
    rating: number;
}

export const getStarRating = ({ rating }: StarRatingProps): JSX.Element => {
    const safeRating = Math.max(0, Math.min(10, Number(rating) || 0)); // constrain to 0–10
    const fullStars = Math.floor(safeRating / 2);
    const halfStar = safeRating % 2 >= 1;
    const emptyStars = Math.max(0, 5 - fullStars - (halfStar ? 1 : 0)); // avoid negatives

    return (
        <div className="pizza-rating">
            {Array.from({ length: fullStars }, (_, i) => (
                <span key={`full-${i}`}>★</span>
            ))}
            {halfStar && <span key="half">½</span>}
            {Array.from({ length: emptyStars }, (_, i) => (
                <span key={`empty-${i}`}>☆</span>
            ))}
        </div>
    );
};
