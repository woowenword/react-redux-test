//smart 组件---逻辑+dumb组件
import React, { Component } from 'react';
import CommentInput from '../components/CommentInput'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { initComments, addComment } from '../reducers/comment';


//CommentInputContainer
//一个smart组件，负责初始化姓名，发布评论
class CommentInputContainer extends Component{
    static properTypes = {
        onSubmit: PropTypes.fun,
        onUserNameInputBlur: PropTypes.fun
    }

    constructor(props){
        super(props);
        this.state = {
            username: ''
        }
    }

    componentWillMount(){
        this._loadUsername();//初始化
    }

    _loadUsername(){
       const username = localStorage.getItem('userName');
       username && this.setState({
            username
       })

    }

    _saveUsername(name){
        localStorage.setItem('userName', name)
    }

    handleUserNameInputBlur(name){
        this._saveUsername(name)
    }

    handleSubmitInfo(comment){//发布信息
        if(!comment) return
        if(!comment.username){ alert('用户名不能为空');return }
        if(!comment.content){ alert('内容不能为空');return }
        const { comments } = this.props
        console.log(this.props.comments)
        const newComments = [...comments, comment]
        localStorage.setItem('comments', JSON.stringify(newComments))
        this.props.addCommentFun && this.props.addCommentFun( comment )
    }

    render(){
        return(
            <div>
                <CommentInput
                username={ this.state.username }
                onUserNameInputBlur={ this.handleUserNameInputBlur.bind(this) } 
                onSubmit={this.handleSubmitInfo.bind(this)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //初始化评论
        initCommentFun: (comments) => {
            dispatch( initComments(comments) )
        },
        //新增评论
        addCommentFun: (comment) => {
            dispatch( addComment(comment) )
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentInputContainer);