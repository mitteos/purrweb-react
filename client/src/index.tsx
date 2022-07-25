import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const container = document.getElementById('root')!;
const root = createRoot(container);

const store = setupStore()
console.log(process.env.REACT_APP_API_URL)
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

