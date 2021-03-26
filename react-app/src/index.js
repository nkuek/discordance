import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import { SocketContext, socket } from './context/socket';
import configureStore from './store';

const store = configureStore();

function Root() {
    return (
        <Provider store={store}>
            <SocketContext.Provider value={socket}>
                <ModalProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ModalProvider>
            </SocketContext.Provider>
        </Provider>
    );
}
ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
);
