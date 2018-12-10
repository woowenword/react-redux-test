/**
 * 该文件夹context_store 是context与store的结合，context文件夹内容与该文件夹内容相同，只是为了在重写一遍
 * 
 */

import React,{Component} from 'react';
import Header from './components/Header';
import Content from './components/content';
import { PropTypes } from 'prop-types';


const createStore = (reducer)=>{
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state,action)
        listeners.forEach((listener) =>{
            listener()
        })
    }
    dispatch({});
    return{ getState,dispatch,subscribe }
}

const changeColor = (state,action)=>{
    if(!state){
        return{
            chan_color: 'red'
        }
    }
    switch(action.type){
        case 'COLOR':
            return{
                ...state,
                chan_color: action.color
            }
        default:
            return state
    }
}

const store = createStore(changeColor);

export default class NewIndex extends Component{
   static childContextTypes = {
       store: PropTypes.object//注意PropTypes的书写
   }

   getChildContext(){
        return { store }//注意花括号括起来
   }
    render(){
        return(
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

