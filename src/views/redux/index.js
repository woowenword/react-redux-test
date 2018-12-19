/**
 * 以下为一个完整的redux练习 haha
 */
function renderApp (newAppState,oldAppState={}) {
    if(newAppState === oldAppState) return;//数据没有变化，就不渲染了
    renderTitle(newAppState.title)
    renderContent(newAppState.content)
  }
  
  function renderTitle (newTitle,oldTitle={}) {
    if(newTitle === oldTitle) return//数据没有变化，就不再渲染了
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
  }
  
  function renderContent (newContent,oldContent={}) {
    if(newContent === oldContent) return//数据没有变化，就不再渲染了
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
  }

  
 const createStore = (reducer)=>{
    let state = null;
    const listeners = [];
    const subscribe = (listener) => {listeners.push(listener)};//监听数据变动,调用时，传进的参数是一个函数----订阅s者模式
    const getState = () => state//返回state对像
    const dispatch = (action) => {//初始化state 及修改数据 并更新数据
        state = reducer(state,action)//reducer的作用：返回新的对象（或初始化数据）并修改数据
        listeners.forEach((listener) => listener())
    }
    dispatch({})//初始化数据
    return{ getState,dispatch,subscribe };
 }

 function themeColor(state,action){
    if(!state){
        return{
			title: {
				text: 'React.js 小书',
				color: 'red',
			},
			content: {
				text: 'React.js 小书内容',
				color: 'blue'
			}
        }
    }
    switch(action.type){
        case 'CHANGE_TEXT':
            return{
                ...state,
				title:{
					...state.title,
					text: action.text
				}
              
            }
        case 'CHANER_COLOR':
            return{
                ...state,
                title:{
					...state.title,
					color: action.color
				}
            }
        default:
            return state
    }
 }


 const store = createStore(themeColor);
 let oldState = store.getState();//缓存旧的state
 store.subscribe(()=>{
     const newState = store.getState()//数据可能变化，缓存新的state
     renderApp(newState,oldState)//把新旧数据传进去
     oldState = newState//渲染完以后新的state变成了旧的state。等待下一次数据变化重新渲染   
 })//监听数据变动；
 renderApp(store.getState())//首次渲染页面
 store.dispatch({type:'CHANER_COLOR',color:'blue'});
 store.dispatch({type:'CHANGE_TEXT',text:'旋转'})



  // 套路就是：

// 定一个 reducer
function reducer (state, action) {
    /* 初始化 state 和 switch case */
  }
  
  // 生成 store
  const store = createStore(reducer)
  
  // 监听数据变化重新渲染页面
  store.subscribe(() => renderApp(store.getState()))
  
  // 首次渲染页面
  renderApp(store.getState()) 
  
  // 后面可以随意 dispatch 了，页面自动更新
  store.dispatch(...)