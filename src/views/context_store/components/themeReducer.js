import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Header extends Component{
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
        const {store} = this.context;
        const state = store.getState();
        console.log(state)
        this.setState({
            color: state.chan_color
        })
    }


    handleChangeColor(color){
        console.log(color)
        const {store} = this.context;
        store.dispatch({type:'COLOR',color:color})
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
