//成为可复用的组件---Dumb组件---它的所有渲染操作都只依赖于prop来完成
import React,{ Component } from 'react';

export default class Comment extends Component{
    constructor(props){
        super(props);
        this._timer = null;
        this.state = {
            timeString: ''
        }
    }
    
    componentWillMount(){
        this._updateTimeString();
        this._timer = setInterval(()=>{ this._updateTimeString() },60000)
    }

    _updateTimeString(){
        const timePeriod = (+new Date() - this.props.contentInfo.createdTime)/1000;
        this.setState({
            timeString:  timePeriod>60 ?
            `${Math.round(timePeriod/60)}分钟前`:
            `${Math.round(Math.max(timePeriod,1))}秒前`
        })
       
    }

    componentWillUnmount(){
        clearInterval(this._timer);
    }
    render (){
        const { contentInfo,onDeleteComment,dataIndex } = this.props;
        return (
            <div className="component-container" data-index={dataIndex}>
                <span className="username">{ contentInfo.username }：</span>
                <span>{ contentInfo.content }</span>
                <span className='delete-btn' onClick={()=>{onDeleteComment(dataIndex)}}>删除</span>
                <span className="createTime">{ this.state.timeString }</span>
            </div>
        )
    }
}