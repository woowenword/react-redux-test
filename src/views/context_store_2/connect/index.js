import PropTypes from 'prop-types';
import React, { Component } from 'react';

// const connect = (WrappedComponent)=>{
//     class Connect extends Component{
//         static contextType = {
//             store: PropTypes.object
//         }
//         //store，如何从context中取出数据
//         //每个组件需要的数据不一样
//         render(){
//             return (
//                 <WrappedComponent />
//             )
//         }
//     }
//     return Connect;
// }


const mapStateToProps = (state)=>{//取数据---mapStateTopProps 相当于告知了 Connect 应该如何去 store 里面取数据，然后可以把这个函数的返回结果传给被包装的组件
    return{
        color: state.color,
        name: state.name
    }
}
const mapDispatchToProps = (dispatch)=>{//接收一个dispatch对象，返回
    return{
        onSwitch:(color)=>{
            dispatch({type:'COLOR',color:color});
        }
    }

}

//进一步优化connect方法
const connect = (mapStateToProps,mapDispatchToProps)=>(WrappedComponent)=>{//connect 是一个函数，返回了一个高阶组件
    class Connect extends Component{
        static contextTypes = {
            store: PropTypes.object
        }
        constructor(props){
            super(props)
            this.state = {
                allProps:{}
            }
        }
        componentWillMount(){
            const {store} = this.context
            this._updataState()
            store.subscribe(()=>this._updataState())
        }

        _updataState(){
            const {store} = this.context
            let stateProps = mapStateToProps ? mapStateToProps(store.getState(),this.props) : {}//防止mapStateToProps没有传入
            let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch,this.props) : {}
            this.setState({
                allProps:{
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }
        render(){
            return(
                <WrappedComponent {...this.state.allProps}/>
            )
        }
      
    }
    return Connect;
}

export default connect