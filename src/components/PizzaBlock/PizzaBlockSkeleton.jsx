import React from "react"
import ContentLoader from "react-content-loader"

export const PizzaBlockSkeleton = (props) => (
    <div className="pizza-block">
        <ContentLoader
            speed={2}
            width={280}
            height={465}
            viewBox="0 0 280 465"
            backgroundColor="#f5cc94"
            foregroundColor="#ecebeb"
            {...props}
        >
            <circle cx="464" cy="190" r="42"/>
            <rect x="0" y="1" rx="0" ry="0" width="260" height="250"/>
            <rect x="0" y="305" rx="11" ry="11" width="280" height="86"/>
            <rect x="69" y="265" rx="9" ry="9" width="140" height="20"/>
            <rect x="8" y="425" rx="0" ry="0" width="92" height="30"/>
            <rect x="177" y="415" rx="21" ry="21" width="95" height="45"/>
        </ContentLoader>
    </div>
)

