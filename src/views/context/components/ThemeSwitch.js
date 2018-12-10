import React,{Component} from 'react';
import ProperTypes from 'prop-types';

export default class ThemeSwitch extends Component{
    static contextTypes = {
        store:ProperTypes.object
    }
    constructor(){
        super()
        this.state = {
            themeColor:''
        }
    }
    componentWillMount(){
        const {store} = this.context;
        this._updateThemeColor();
        store.subscribe(()=>{ this._updateThemeColor() })

    }
    _updateThemeColor(){
        const {store} = this.context;
        this.setState({
            themeColor:(store.getState()).themeColor
        })
    }
    handleChangeColor(color){
        const {store} = this.context;
        store.dispatch({type:'CHANGER_COLOR',themeColor:color});
    }
    render(){
        return(
            <div>
                <button style={{ color: this.state.themeColor }} onClick={this.handleChangeColor.bind(this,'red')}>red</button>
                <button style={{color:this.state.themeColor}} onClick={this.handleChangeColor.bind(this,'blue')}>blue</button>
            </div>
        )
    }
}