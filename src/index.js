import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from '../src/store/index'
import './css/index';
import * as serviceWorker from './serviceWorker';

//import App from './views/App';
//import Index from './views/context/index'
//import NewIndex from './views/context_store/index'
// import NewIndex2 from './views/context_store_2/index'
import CommentApp from './views/comment/index'
import CommentApp2 from './views/comment_2/index'

ReactDOM.render(
    <Provider store={ configStore() }>
        <CommentApp2 />
    </Provider>,
    document.getElementById(('root'))
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
