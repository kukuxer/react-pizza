import "../scss/app.scss";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import {lazy, Suspense} from "react";
import Home from "../pages/Home";
import Loading from "../components/Loading";


const Cart = lazy(() => import(/* webpackChunkName: "cart" */"../pages/Cart"));
const PizzaPage = lazy(() => import(/* webpackChunkName: "pizza" */"../pages/PizzaPage"));
const NotFoundPage = lazy(() => import(/* webpackChunkName: "not-found" */"../pages/NotFound"));

function App() {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="pizza/:id" element={<PizzaPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;