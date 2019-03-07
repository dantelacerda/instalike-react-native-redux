import {SET_POSTS, CREATING_POST, POST_CREATED} from "../actions/actionTypes"

const initialState = {
    posts: [],
    isUploading: false,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }

        case CREATING_POST:
            return {
                ...state,
                isUploading: true
            }

        case POST_CREATED:
            return {
                ...state,
                isUploading: false
            }

        default:
            return state
    }

}

export default reducer