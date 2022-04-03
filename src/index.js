import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'


// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));

