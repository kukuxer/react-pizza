import "../../scss/app.scss";
import {Header} from "../Header";
import {Home} from "../../pages/Home";
import {NotFoundPage} from "../../pages/NotFoundPage";
import {Route, Routes} from "react-router-dom";
import {Cart} from "../../pages/Cart";
import {createContext, useState} from "react";


export const SearchContext = createContext('');

function App() {
    const [searchValue, setSearchValue] = useState('');



    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
}

export default App;