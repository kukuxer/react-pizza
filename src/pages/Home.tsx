import React, {useCallback, useEffect, useMemo} from 'react'


import {PizzaBlock, PizzaBlockSkeleton, Sort, Pagination, Categories} from "../components";
import {useSelector} from "react-redux";
import {selectFilter, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from 'qs'
import {useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice";
import {ErrorPage} from "../components/ErrorPage";
import {useAppDispatch} from "../redux/store";


const Home: React.FC = () => {

    const isMounted = React.useRef(false);
    const isSearch = React.useRef(false);
    const {categoryId, currentPage, sort, searchValue} = useSelector(selectFilter);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {items, status} = useSelector(selectPizzaData);

    const fetchItems = useCallback(async () => {
        const params = new URLSearchParams();
        if (categoryId > 0) params.append('category', String(categoryId));
        if (searchValue) params.append('search', searchValue);
        if (currentPage > 0) params.append('page', String(currentPage));
        params.append('limit', '4');

        dispatch(fetchPizzas({params}));
    }, [categoryId, currentPage, searchValue, dispatch]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const parsedCategoryId = Number(params.categoryId);
            const parsedPage = Number(params.currentPage);
            const parsedSort = Number(params.sortIndex);
            dispatch(setFilters({
                searchValue,
                categoryId: parsedCategoryId,
                currentPage: parsedPage,
                sort: parsedSort
            }));
        }
    }, []);

    useEffect(() => {
        if (!isSearch.current) {
            fetchItems().then( () => window.scrollTo({top: 25, behavior: 'smooth'}));
        }
        isSearch.current = false;
    }, [categoryId, currentPage, searchValue]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                currentPage
            });
            navigate(`?${queryString}`);
        } else {
            isMounted.current = true;
        }
    }, [categoryId, currentPage]);


    const SortedPizzas = useMemo(() => {
        return [...items]
            .sort((a, b) => {
                if (sort === 1) return a.price - b.price;
                if (sort === 2) return a.name.localeCompare(b.name);
                return b.rating - a.rating;
            })
            .map((obj) => <PizzaBlock key={obj.id} product={obj}/>);
    }, [items, sort]);


    const Skeletons = useMemo(() => [...Array(9)].map((_, i) => <PizzaBlockSkeleton key={i}/>), []);


    if (status === 'error') {
        return (
            <ErrorPage/>
        )
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId}/>
                <Sort sortIndex={sort}/>
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
                <div className="content__items">
                    {
                        (status === 'loading')
                            ? Skeletons
                            : SortedPizzas
                    }
                </div>
            </div>
            <Pagination currentPage={currentPage} onChangePage={(e: any) => dispatch(setCurrentPage(e))}/>
        </div>
    )
}
export default Home
