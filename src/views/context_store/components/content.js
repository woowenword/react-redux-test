import React,{Component} from 'react';
import ThemeReducer from './themeReducer'
import { PropTypes } from 'prop-types';

export default class Content extends Component{
    static contextTypes = {
        store: PropTypes.object
    }
    constructor(props){
        super(props)
        this.state = {
            color: ''
        }
    }

    componentWillMount(){
        const {store} = this.context
        this._updateColor();
        store.subscribe(()=>this._updateColor())
    }
    _updateColor(){
        const {store} = this.context
        const state = store.getState()
        this.setState({
            color: state.chan_color
        })
    }

    render(){
        return(
            <div>
                <main style={{color:this.state.color}}>
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