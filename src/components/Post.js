import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Image
} from 'react-native'
import Author from './Author'
import Comments from './Comments'
import AddComment from './AddComment'
import {connect} from 'react-redux'

class Post extends Component {
    render() {

        const ADD_COMMENT = this.props.name ? <AddComment postId={this.props.id}/> : null

        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.image}} style={styles.image} />
                <Author email={this.props.email} nickname={this.props.nickname}/>
                <Comments comments={this.props.comments}/>
                {ADD_COMMENT}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1, //Isso vai permitir crescer o componente
    },
    image: {
        width: Dimensions.get('window').width, // Vai pegar toda a largura da tela
        height: Dimensions.get('window').width * 3 / 4, // A altura vai ser 3/4 to tamanho da largura, ficando wide
        resizeMode: 'contain'
    }
})

const mapStateToProps = ({user}) => {
    return {
        name: user.name
    }
}

export default connect(mapStateToProps)(Post)