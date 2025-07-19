import './App/index.css';
import App from './App/App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {createRoot} from "react-dom/client";
import {StrictMode} from "react";

const root = createRoot(document.getElementById('root')!);
root.render(
    <StrictMode>
        <Provider store={store} >
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);


