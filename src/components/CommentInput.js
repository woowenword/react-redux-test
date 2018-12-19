
import React,{ Component } from 'react';
import PropTypes from 'prop-types';

/*对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。*/
export default class CommentInput extends Component{
    static propTypes = {
        username: PropTypes.any,
        onSubmit: PropTypes.func,
    }

    static defaultProps = {
        username: ''
    }

    constructor(props){
        super(props);
        //修改为Dumb组件：
        this.state = {
            username: props.username,//从props上取username值
            content: ''
        }
    }

    componentWillMount(){}

    componentDidMount(){//dom加载完毕后，聚焦
        this.textarea.focus();
    }

    handleUsernameBlur(event){
        if(this.props.onUserNameInputBlur){
            this.props.onUserNameInputBlur(event.target.value)
        }
    }

    handleUsernameChange(event){
        //监听输入框事件
        this.setState({
            username : event.target.value
        })
    }

    handleContentChange(event){//监听内容框事件
        this.setState({
            content : event.target.value
        })
    }

    handleButtonClick(){
        if(this.props.onSubmit){
            const { username , content } = this.state;
            this.props.onSubmit({ username , content, createdTime: +new Date() })
        }
        this.setState({
            content : ''
        })
    }
    
    render(){
        return (
            <div className="inputContainer">
                <div className="inputName">
                    <span>用户名:</span>
                    <input type="text" 
                    value={this.state.username} 
                    onChange={this.handleUsernameChange.bind(this)}
                    onBlur={this.handleUsernameBlur.bind(this)}/>
                </div>
                <div className="inputContent">
                    <span>评论内容:</span>
                    <textarea name="" id="" cols="25" rows="10" 
                    ref={(textarea) =>this.textarea=textarea} 
                    value={this.state.content} 
                    onChange={this.handleContentChange.bind(this)}></textarea>
                </div>
                <div className="buttonContainer">
                    <button className="inputButton" onClick={this.handleButtonClick.bind(this)}>发布</button>
                </div>
            </div>
        );
    }
}