export default function (state, action) {
    switch(action.type) {
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case "setBlogPosts": {
            return {
                ...state,
                blogPosts: action.data
            }
        }
        default: 
            return state
    }
}