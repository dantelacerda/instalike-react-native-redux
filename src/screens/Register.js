import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native'
class Register extends Component {

    state = {
        name: null,
        email: '',
        password: '',
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'Nome'} style={styles.input}
                           autoFocus={true} value={this.state.name}
                           onChangeText={name => this.setState({name})}> </TextInput>

                <TextInput placeholder={'Email'} style={styles.input}
                           keyboardType={'email-address'} value={this.state.email}
                           onChangeText={email => this.setState({email})}> </TextInput>

                <TextInput placeholder={'Senha'} style={styles.input}
                           secureTextEntry={true} value={this.state.password}
                           onChangeText={password => this.setState({password})}> </TextInput>

                <TouchableOpacity onPress={() => {}} style={styles.buttom}>
                    <Text style={styles.buttomText}>Salvar</Text>
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
        height: 40,
        backgroundColor: '#EEE',
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15
    }
})

export default Register