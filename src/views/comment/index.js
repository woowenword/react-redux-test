
import React,{ Component } from 'react';
import CommentInput from './components/CommentInput'
import CommentList from './components/CommentList'
import './css/index.less'

class CommentApp extends Component{
    constructor(){
        super();
        this.state={
            comments : []
        }
    }
    componentWillMount(){
        this._loadComments();
    }
    _loadComments(){
        let comments = localStorage.getItem('comments');
        if(comments){
            this.setState({
                comments: JSON.parse(comments)
            })
        }
    }
    _saveCommens(infos){
        localStorage.setItem('comments',JSON.stringify(infos))
    }
    handleSubmitComment(comment){
        if(!comment){return}
        if(!comment.username){alert("用户名不能为空");return}
        if(!comment.content){alert("评论内容不能为空");return}
        this.state.comments.push(comment);
        this.setState({
            comments : this.state.comments
        })
        this._saveCommens( this.state.comments)
    }
    handleDeleteComment(index){//删除
        this.state.comments.splice(index,1);//删除该位置的数据，会改变原始数组
        this.setState({
            comments : this.state.comments
        })
        this._saveCommens( this.state.comments)
    }
    render (){
        return (
            <div className="appContainer">
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
                <CommentList userComments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)}/>
            </div>
        )
    }
}

export default CommentApp;