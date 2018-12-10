import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './views/App';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
//import Index from './views/context/index'
//import NewIndex from './views/context_store/index'
// import NewIndex2 from './views/context_store_2/index'
import CommentApp from './views/comment/index'
ReactDOM.render(
    <CommentApp />,
    document.getElementById(('root'))
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
