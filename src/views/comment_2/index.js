//该文件是对comment文件的一个升级，使用react-reduce
import React,{ Component } from 'react';
import CommentListContainer from '../../containers/CommentList';
import CommentInputContainer from '../../containers/CommentInput';
import './css/index.less';

export default class CommentApp extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <CommentInputContainer />
                <CommentListContainer />
            </div>
        )
    }
}