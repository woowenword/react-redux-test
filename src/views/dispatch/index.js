
  function renderApp (appState) {
    renderTitle(appState.title)
    renderContent(appState.content)
  }
  
  function renderTitle (title) {
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
  }
  
  function renderContent (content) {
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
  }
  //优化后的：
  function newRenderApp(newAppState,oldAppState){
      if(newAppState === oldAppState){return}//数据没有变化就不渲染了
      newRenderTitle(newAppState.title);

  }
  function newRenderTitle(newTitle,oldTitle){
    if(newTitle === oldTitle) return;
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
  }

let appState = {
    title:{
        text:'江南可采莲',
        color:'red'
    },
    content:{
        text:'莲叶何田田',
        color:'blur'
    }
}

const stateChanger = (state,action)=>{
        switch (action.type) {
            case 'TEXT':
                state.title.text = action.text;//缺点：修改了原来的state对象
                break;
            case 'COLOR':
                state.content.color = action.color;
                break;
            default:
                return state;
        }
}

/**
 * 优化后的stateChanger:
 * 通过使用扩展字符串...，返回一个新对象
 */
const newStateChanger = (state,action)=>{
    switch (action.type) {
        case 'TEXT':
            return{
                ...state,//...扩展字符串，浅拷贝
                title:{
                    ...state.title,
                    text:action.text
                }
            }
        case 'COLOR':
            return{
                ...state,
                content:{
                    ...state.content,
                    color:action.color
                }
            }
        default://如果没有修改则返回原来的对象
            return state;
    }
}

/**
 * 进一步优化：
 * newStateChanger的功能是可以初始化数据和修改数据
 *是一个纯函数
 *作用是初始化和计算新的state
 */
const newStateChanger2 = (state,action)=>{
    if(!state){//state没有
        return{
            title:{
                text:'江南可采莲',
                color:'red'
            },
            content:{
                text:'莲叶何田田',
                color:'blur'
            }
        }
    }
    switch (action.type) {
        case 'TEXT':
            return{
                ...state,//...扩展字符串，浅拷贝
                title:{
                    ...state.title,
                    text:action.text
                }
            }
        case 'COLOR':
            return{
                ...state,
                content:{
                    ...state.content,
                    color:action.color
                }
            }
        default://如果没有修改则返回原来的对象
            return state;
    }
}


const createStore = (state,stateChanger)=>{//该方法是将dispatch 和state整合起来的一个方法，用来专门生产这种 state 和 dispatch 的集合，
    const getState = ()=>state;
    const dispatch = (action)=>stateChanger(state,action);
    // dispatch 用于修改数据，和以前一样会接受 action，然后它会把 state 和 action 一并传给 stateChanger，那么 stateChanger 就可以根据 action 来修改 state 了。
    return {getState, dispatch}
}

const store = createStore(appState,stateChanger);//返回getState 和 dispatch 两个方法
renderApp(store.getState());//首次渲染，获取数据
store.dispatch({type:'TEXT',text:'被更改文案了'})//修改数据
renderApp(store.getState());//修改数据后，再次更新数据---

//上面的缺点是：每次修改完数据后，还需要手动更新数据，，，

/**
 * 进一步优化：
 * 不需要手动更新：优化createStore方法---监控数据变化
 * @param {} state 
 * @param {*} stateChanger 
 */

const createStore1 = (state,stateChanger)=>{
    const listeners = [];
    const subscribe = (listener)=>listeners.push(listener);
    const getState = ()=>state;
    const dispatch = (action)=>{
        state = stateChanger(state,action);//覆盖原对象
        listeners.forEach((listener)=>{listener()})

    }
    return {getState,dispatch,subscribe}
}

const store1 = createStore1(appState,stateChanger);
store1.subscribe(()=>renderApp(store1.getState()));//监听数据修改
renderApp(store1.getState());//首次渲染数据
store1.dispatch({type:'TEXT',text:'优化后的文案'})
//数据修改后，无需在手动刷新了


//总结：
//现在我们有了一个比较通用的 createStore，它可以产生一种我们新定义的数据类型 store，
//通过 store.getState 我们获取共享状态，而且我们约定只能通过 store.dispatch 修改共享状态。
//store 也允许我们通过 store.subscribe 监听数据数据状态被修改了，并且进行后续的例如重新渲染页面的操作



/**
 * 3.在进一步优化：
 * 将createSore优化为一个参数：参数名字reducer
 * 
 */
const createStore2 = (reducer)=>{
    let state = null;
    const listeners = [];
    const subscribe = (listener)=>{listeners.push(listener)}
    const getState = ()=>state;
    const dispatch = (action)=>{
        state = reducer(action);
        listeners.forEach((listener)=>listener())
    }
    dispatch({});//初始化state
    return {getState,dispatch,subscribe};
}
let store = createStore2(newStateChanger2)
