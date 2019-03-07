import {USER_LOGGED_IN, USER_LOGGED_OUT} from "./actionTypes"

//ESSA É UMA FUNÇÃO DE LOGIN QUE RECEBE UM USER COMO PARAMETRO E RETORNA COMO PAYLOAD O USER
export const login = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

//MÉTODO DE LOGOUT QUE NAO TEM PARÂMETRO, PORTANTO NAO TEM PAYLOAD
export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}