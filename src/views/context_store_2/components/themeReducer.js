import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import connect from './../connect/index';

class ThemeReducer extends Component{
    static contextTypes = {
        store: PropTypes.object,
        onSwitch: PropTypes.func,
    }
    constructor(props){
        super(props)
        
        this.state = {
            color: ''
        }
    }
    
    handleChangeColor(color){
        if(this.props.onSwitch){
            this.props.onSwitch(color)
        }
    }
    render(){
        console.log(this.state.color)
        return(
            <div>
                <button style={{color: this.state.color}} onClick={this.handleChangeColor.bind(this,'red')}>red</button>
                <button style={{color: this.state.color}} onClick={this.handleChangeColor.bind(this,'blue')}>blue</button>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        color:state.chan_color
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onSwitch: (color)=>{
            dispatch({type:'COLOR',color:color})
        }
        
    }
}
ThemeReducer = connect(mapStateToProps,mapDispatchToProps)(ThemeReducer)
export default ThemeReducer