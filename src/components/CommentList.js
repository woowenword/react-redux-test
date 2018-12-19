//成为一个可复用的组件----Dumb组件：只依赖props
import React,{ Component } from 'react';
import Comment from './Comment';
import { PropTypes } from 'prop-types';


export default class ComponentList extends Component{
    static propType = {
        userComments: PropTypes.array
    }
    static defaultProps = {
        userComments : []
    }
    
    constructor(props){
        super(props);
    }   

    handleClickDelet(index){//子组件Comment.js 回调给父组件CommentList
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index);//再次回调给container/CommentList组件
        }
    }
    
    render(){
        return(
            <div className="component-list-container">
                {this.props.userComments.map((contentInfo,i) => {
                    return <Comment dataIndex={i} key={i} contentInfo={contentInfo} onDeleteComment={this.handleClickDelet.bind(this)}/>
                })}
            </div>
        )
    }
}