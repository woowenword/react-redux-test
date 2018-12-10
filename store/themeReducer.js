function createStore(reducer){
    let state = null;
    const listeners = [];
    const subscribe = (listener)=>listeners.push(listener)
    const getState = () => state;
    const dispatch = (action)=>{
        state = reducer(state,action);
        listeners.forEach((listener)=>{listener()})
    }
    dispatch({})
    return{ getState,dispatch,subscribe}
}
const themeReducer = (state,action)=>{
    if(!state){
        return {
            themeColor:'red'
        }
    }
    switch (action.type){
        case 'CHANGER_COLOR':
            return{...state,themeColor:action.themeColor}

    }
}
