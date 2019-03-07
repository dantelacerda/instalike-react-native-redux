import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    Alert
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {connect} from 'react-redux'
import {addPost} from "../store/actions/posts"

const noUser = 'Você precisa estar logado para adicionar imagens'

class AddPhoto extends Component {

    state = {
        image: null,
        comment: ''
    }


    componentDidUpdate = prevProps => {

        //Limpando o formulario apos o carregamento da imagem
        if(prevProps.loading && !this.props.loading) {
            this.setState({
                image: null,
                comment: '',
            })

            //E quanto acabar, vai recarregar o Feed
            this.props.navigation.navigate('Feed')
        }
    }

    pickImage = () => {

        if(!this.props.name) {
            Alert.alert('Falha!', noUser)
            return
        }

        ImagePicker.showImagePicker( {
            title: 'Escolha a imagem',
            maxHeight: 600,
            maxWidth: 800
        }, res => {

            if(!res.didCancel) {
                this.setState({image: {uri: res.uri, base64: res.data }})
            }
        })
    }

    save = async() => {

        if(!this.props.name) {
            Alert.alert('Falha!', noUser)
            return
        }

        this.props.onAddPost({
            id: Math.random(),
            nickname: this.props.name, //Usuário Logado
            email: this.props.email, //Email do usuário logado
            image: this.state.image, // Imagem selecionada pelo usuario
            comments: [{
                nickname: this.props.name, // Usuário Logado
                comment: this.state.comment, // Comentário informado na tela
            }]
        })

    }

    render() {


        return(
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}> Compartilhe uma imagem</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image} />
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
                        <Text style={styles.buttomText}> Escolha a foto</Text>
                    </TouchableOpacity>

                    <TextInput placeholder={'Conte sua história sobre a foto!'}
                            style={styles.input} value={this.state.comment} editable={this.props.name != null}
                            onChangeText={comment => this.setState({comment})}
                            />

                    <TouchableOpacity onPress={this.save}
                                      disabled={this.props.loading}
                                      style={[styles.buttom, this.props.loading ? styles.buttomDisabled : null]}>
                        <Text style={styles.buttomText}> Salvar </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 2,
        backgroundColor: '#EEE',
        marginTop: 10
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 2,
        resizeMode: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomDisabled: {
        backgroundColor: '#AAA'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%'
    }
})

//Pegando os atributos que quero do props, estao em user, sao o email e usuario.
const mapStateToProps = ({ user, posts }) => {
    return {
        email: user.email,
        name: user.name,
        loading: posts.isUploading
    }
}

//Criando os métodos que precisam ter dispatch. Ex.: onAddPost é a ação do método/botao save que recebe um post como parametro;
const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)