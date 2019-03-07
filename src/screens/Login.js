import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { login } from '../store/actions/user'

class Login extends Component {

    state = {
        name: 'Temporário',
        email: '',
        password: '',
    }

    login = () => {
        this.props.onLogin({...this.state}) // So passei o state fazendo spreading por que ele ja passa os atributos convertendo automaticamente
        this.props.navigation.navigate('Profile')
    }

    render() {
        return (

            <View style={styles.container}>
                <TextInput placeholder={'Email'} style={styles.input} autoFocus={true}
                           keyboardType={'email-address'} value={this.state.email}
                           onChangeText={email => this.setState({email})}/>

                <TextInput placeholder={'Senha'} style={styles.input} autoFocus={true}
                           secureTextEntry={true} value={this.state.password}
                           onChangeText={password => this.setState({password})}/>


                <TouchableOpacity onPress={this.login} style={styles.buttom}>
                    <Text style={styles.buttomText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                                  onPress={() => {this.props.navigation.navigate('Register')}}
                                  style={styles.buttom}>
                    <Text style={styles.buttomText}>Criar nova conta...</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286F4'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        // A função onLogin recebe um "user" como parâmetro e faz o dispatch para o metodo login que foi importado com esse user
        onLogin: user => dispatch(login(user))
    }
}

// O Primeiro parametro é o state e o segundo é o dispatch. Nesse caso nao precisa passar state.
// O Connect está conectando esse dispatch com o Login. É um DECORATOR.
export default connect(null, mapDispatchToProps)(Login)