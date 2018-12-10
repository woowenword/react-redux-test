import React,{Component} from 'react';
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
        const {store} = this.context
        const state = store.getState()
        this.setState({
            color: state.chan_color
        })
    }
    render(){
        return(
            <div style={{color: this.state.color}}>
                <h3>长恨歌</h3>
            </div>
        )
    }
}
