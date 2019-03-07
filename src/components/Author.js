import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import { Gravatar} from 'react-native-gravatar'

export default props => {
    return(

        <View style={styles.container}>
            <Gravatar options={{ email: props.email, secure: true}} style={styles.avatar}/>
            <Text style={styles.nickname}> {props.nickname} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', //Assim vai ficar o avatar do cara na esquerda e o nome na direita
        alignItems: 'center',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 10
    },
    nickname: {
        color: '#444',
        marginVertical: 10,
        fontSize: 15,
        fontWeight: 'bold'
    }
})
