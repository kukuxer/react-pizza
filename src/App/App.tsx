import "../scss/app.scss";
import {Home} from "../pages/Home";
import {NotFoundPage} from "../pages/NotFoundPage";
import {Route, Routes} from "react-router-dom";
import {Cart} from "../pages/Cart";
import PizzaPage from "../pages/PizzaPage";
import Layout from "./Layout";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="pizza/:id" element={<PizzaPage/>}/>
            </ Route>
        </Routes>
    );
}

export default App;