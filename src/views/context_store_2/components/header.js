import React,{Component} from 'react';
import { PropTypes } from 'prop-types';
import connect from '../connect/index';

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            color: ''
        }
    }
    
    render(){
        return(
            <div style={{color: this.props.color}}>
                <h3>长恨歌</h3>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        color: state.chan_color
    }
}
 Header = connect(mapStateToProps)(Header)

 export default Header