import React, { Component } from 'react';
import CommentList from '../components/CommentList'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { initComments, deleteComment } from '../reducers/comment';


//CommentListContainer
//一个smart组件，负责评论列表的数据加载，初始化，删除评论
class CommentListContainer extends Component{
    static properTypes = {
        // comments: ProperTypes.array,
        initComments: PropTypes.fun,
        onDeleteComment: PropTypes.fun
    }

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this._loadComments();//初始化评论
    }

    _loadComments(){
        //从local中加载数据
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.parse(comments) : []
        //this.props.initCommentsFun是connect传进来的
        this.props.initCommentsFun(comments);//把数据初始化到state中
    }

    handleDeleteComment(index){//从子组件：components/CommentList中拿到index值
        const { comments } = this.props;
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index + 1)
        ]
        //保存最新评论列表：
        localStorage.setItem('comments', JSON.stringify(newComments))
        //this.props.deleteCommentFun是从connect中传进来的
        //会dispatch 一个action 删除一个评论
        this.props.deleteCommentFun && this.props.deleteCommentFun(index)
    }

    render(){
        return(
            <div>
                <CommentList 
                userComments={ this.props.comments }
                onDeleteComment={this.handleDeleteComment.bind(this)}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments//初始化数据
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //提供给CommentListContainer
        //初始化评论
        initCommentsFun: (comments) => {
            dispatch(initComments(comments))
        },
        //删除评论：
        deleteCommentFun: (commentIndex) => {
            dispatch(deleteComment(commentIndex))
        }        

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentListContainer);