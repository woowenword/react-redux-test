//reducer 用来描述数据的形态和相应的变更


//定义action types
const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT'


//reducer
export default function(state,action){
    if(!state){
        state = { comments: [] }
    }   
    switch (action.type){
        case INIT_COMMENTS://初始化评论
            return { comments: action.comments}
        case ADD_COMMENT://新增评论
            return {
                comments: [...state.comments, action.comment]
            }
        case DELETE_COMMENT://删除评论
            return {
                comments: [
                    ...state.comments.slice(0, action.commentIndex),
                    ...state.comments.splice(action.commentIndex + 1)
                ]
            }
        default:
            return state
    }
}

//action creators ---返回action的函数
export const initComments = (comments) => {
    return { type: INIT_COMMENTS,comments}
}

export const addComment = (comment) => {
    return { type: ADD_COMMENT, comment}
}

export const deleteComment = (commentIndex) => {
    return { type: DELETE_COMMENT, commentIndex }
}

/**
 * 有些朋友可能会发现我们的 reducer 跟网上其他的 reducer 的例子不大一样。有些人喜欢把 action 单独切出去一个目录 actions，让 action 和 reducer 分开。个人观点觉得这种做法可能有点过度优化了，其实多数情况下特定的 action 只会影响特定的 reducer，直接放到一起可以更加清晰地知道这个 action 其实只是会影响到什么样的 reducer。而分开会给我们维护和理解代码带来额外不必要的负担，这有种矫枉过正的意味。但是这里没有放之四海皆准的规则，大家可以多参考、多尝试，找到适合项目需求的方案。
 */