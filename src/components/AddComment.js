import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback as TWF,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {addComment} from "../store/actions/posts";

class AddComment extends Component {
    state = {
        comment: '',
        editMode: false // Isso vai controlar se o cara está comentando algo realmente ou se esta apenas visualizando
    }

    handleAddComment = () => {
        this.props.onAddComment({
            postId: this.props.postId,
            comment: {
                nickname: this.props.name,
                comment: this.state.comment,
            }
        })

        this.setState({comment: '', editMode: false})
    }

    render() {
         let commentArea = null

        //Se a pessoa estiver no modo de edição, vai aparecer um TextInput, caso contrário,
        //Vai aparecer o label com icode de Adicione um comentário, colocando pra true
        if(this.state.editMode) {
           commentArea = (
               <View style={styles.container}>
                    <TextInput placeHolder={'Pode comentar...'}
                    style={styles.input} autoFocus={true}
                    value={this.state.comment}
                    onChangeText={comment => this.setState({comment})}
                    onSubmitEditing={this.handleAddComment}/>

                    <TWF onPress={() => this.setState({editMode: false})}>
                        <Icon name={'times'} size={15} color={'#555'} />
                    </TWF>
               </View>
           )
        } else {
            commentArea = (
                <TWF onPress={() => this.setState({editMode: true})}>
                    <View style={styles.container}>
                        <Icon name={'comment-o'} size={25} color={'#555'}/>
                        <Text style={styles.caption}>Adicione um comentário</Text>
                    </View>
                </TWF>
            )
        }

        return (
            <View style={{flex: 1}}>
                {commentArea}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    caption: {
        marginLeft: 10,
        fontSize: 12,
        color: '#CCC'
    },
    input: {
        width: '90%'
    }
})

//Pegando os atributos que quero do props, estao em user, sao o email e usuario.
const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddComment: payload => dispatch(addComment(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddComment)