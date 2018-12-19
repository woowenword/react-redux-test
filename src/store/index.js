import { createStore } from 'redux';
import commentReducer from '../reducers/comment';

export default function(){
    const store = createStore( commentReducer );
    return store;
}