import {createStore,
    combineReducers,
    compose,
    applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import userReducer from './reducers/user'
import postsReducer from './reducers/posts'

//Nesse momento tou dizendo que as informacoes de cada reducer vai estar disponivel globalmente na variavel deles.
// Ex.: As informações de Usuário(name e email) vao estar disponíveis no "user", como se fosse cookies, mas em estado global
const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer
})

// Aqui estou aplicando o middlewere do thunk com os reducers
const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig