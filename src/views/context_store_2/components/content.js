import React,{Component} from 'react';
import ThemeReducer from './themeReducer'
import connect from '../connect/index'
import { PropTypes } from 'prop-types';

class Content extends Component{
    constructor(props){
        super(props)
        this.state = {
            color: ''
        }
    }

    render(){
        return(
            <div>
                <main style={{color:this.props.color}}>
                    <p>七月七日长生殿</p>
                    <p>夜半无人私语时</p>
                    <p>在天愿做比翼鸟</p>
                    <p>在地愿为连理枝</p>
                    <p>天长地久有时尽</p>
                    <p>此恨绵绵无绝期</p>
                </main>
                <ThemeReducer />
            </div>
        )
    }
}
/**
 * 该文件夹中的文件存在大量重复的逻辑
 * 且对contex依赖性过强
 * 如果其他组件引用其中的组件，还需要再写context才能拿到state值
 */
const mapStateToProps = (state)=>{
    return{
        color: state.chan_color
    }
}

 Content = connect(mapStateToProps)(Content)
 export default Content;