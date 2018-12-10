
import React,{ Component } from 'react';
import Comment from './Comment';
import { PropTypes } from 'react';


export default class ComponentList extends Component{
    static propType = {
        //userComments: PropTypes.array
    }
    static defaultProps = {
        userComments : []
    }
    constructor(props){
        super(props);
    }   
    handleClickDelet(index){
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index);
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