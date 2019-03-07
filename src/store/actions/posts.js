import {SET_POSTS, CREATING_POST, POST_CREATED} from "./actionTypes"
import axios from 'axios'

export const addPost = post => {
    return dispatch => {

        //FAZ UM DISPATCH PRA AVISAR QUE ESTA FAZENDO UM POST PRA APLICAÇÃO
        dispatch(creatingPost())

        //Primeiro faz o upload da imagem e caso tenha sucesso, faz a persistencia do POST
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-insta-based.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        }).catch(err => {
            console.log(err)
        }).then(response => {

            //Caso tenha feito o upload correto, guardo so a url em base 64 da imagem no campo de imagem do post
            post.image = response.data.imageUrl

            axios.post('/posts.json', {...post})
                .catch(err => {
                    console.log(err)
                }).then(res => {

                    //Recarrega os posts
                    dispatch(getPosts())
                    //Avisa que o post foi criado
                    dispatch(postCreated())
            })
        })


    }

}

export const addComment = payload => {

    return dispatch => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                console.log(err)
            }).then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)

                // Assim ele vai fazer o PATCH(que é quase um PUT) somente em cima do atributo comments do objeto salvo
                axios.patch(`/posts/${payload.postId}.json`, {comments})
                     .catch(err => {
                        console.log(err)
                     }).then(res => {
                        dispatch(getPosts())
                     })
        })
    }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const getPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => {
                console.log(err)

            }).then(res => {

                //Carrega os posts do firebase
                const rawPosts = res.data
                const posts = []

                //Pra cada post que tiver la cria uma lista
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key,
                    })
                }

                //Faz o Dispatch com o setPosts. O .reverse() faz com que a ultima publicaçao sempre seja a primeira
                dispatch(setPosts(posts.reverse()))
        })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}