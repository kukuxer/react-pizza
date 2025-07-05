import React, {useEffect, useState} from 'react'
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {PizzaBlock, PizzaBlockSkeleton} from "../components/PizzaBlock";
import axios from "axios";
import {Pagination} from "../components/Pagination";
import {SearchContext} from "../components/App/App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from 'qs'
import {useNavigate} from "react-router-dom";


export function Home() {

    const isMounted = React.useRef(false);
    const isSearch = React.useRef(false);
    const {categoryId, currentPage} = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const sortIndex = useSelector(state => state.filter.sort);
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {searchValue} = React.useContext(SearchContext);

    const fetchPizzas = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();

            if (categoryId > 0) params.append('category', categoryId);
            if (searchValue) params.append('search', searchValue);
            if (currentPage > 0) params.append('page', currentPage);
            params.append('limit', 4);

            const {data} = await axios.get(
                `https://6851d68f8612b47a2c0b62f3.mockapi.io/api/v1/items?${params}`
            );
            setPizzas(data);
            console.log("rerender");
        } catch (err) {
            console.error("Failed to fetch pizzas:", err);
            setPizzas([]);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const parsedCategoryId = Number(params.categoryId);
            const parsedPage = Number(params.currentPage);
            const parsedSort = Number(params.sortIndex);
            dispatch(setFilters({
                categoryId: parsedCategoryId,
                currentPage: parsedPage,
                sort: parsedSort
            }));
        }
    }, []);

    useEffect(() => {
        window.scrollTo({top: 25, behavior: 'smooth'});
        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
    }, [categoryId, currentPage, searchValue]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                currentPage,
                sortIndex
            });
            navigate(`?${queryString}`);
        } else {
            isMounted.current = true;
        }
    }, [categoryId, currentPage, sortIndex]);


    const SortedPizzas = [...pizzas]
        .sort((a, b) => {
            if (sortIndex === 1) return a.price - b.price; // sort by price
            else if (sortIndex === 2) return a.name.toLowerCase().localeCompare(b.name.toLowerCase()); // sort by name
            else return b.rating - a.rating; // sort by rating
        })
        .map((obj) => <PizzaBlock key={obj.id} product={obj}/>)

    const Skeletons = [...Array(9)].map((_, index) => <PizzaBlockSkeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => {
                    dispatch(setCategoryId(i));
                    dispatch(setCurrentPage(1));
                }}/>
                <Sort/>
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
                <div className="content__items">
                    {
                        isLoading
                            ? Skeletons
                            : SortedPizzas
                    }
                </div>
            </div>
            <Pagination currentPage={currentPage} onChangePage={(e) => dispatch(setCurrentPage(e))}/>
        </div>
    )
}
