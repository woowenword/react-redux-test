import React,{ Component } from 'react';
import ProperTypes from 'prop-types';

class Header extends Component{
    static contextTypes={
        store:ProperTypes.object
    }
    constructor(){
        super();
        this.state = {
            themeColor:'',
            text:''
        }
    }
    componentWillMount(){
        const {store} = this.context;
        this._updateThemeColor();
        store.subscribe(()=>{ this._updateThemeColor() })//重新渲染数据
    }
    _updateThemeColor(){
        const {store} = this.context;
        const state = store.getState();
        this.setState({
            themeColor:state.themeColor
    })

    }
    render(){
        return(
            <h1 style={{color:this.state.themeColor}}>'React.js 小书'</h1>
        )
    }
}

export default Header;