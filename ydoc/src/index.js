import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SideBar from './components/Home/sidebar'
import Quill from 'quill';
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { QuillBinding } from 'y-quill'
import QuillCursors from 'quill-cursors'
import {BrowserRouter} from "react-router-dom" 
import { WebsocketProvider } from 'y-websocket'
import {store} from './store'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </Provider>
);

