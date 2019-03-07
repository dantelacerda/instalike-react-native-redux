import {AppRegistry} from 'react-native'
import Navigator from './src/Navigator'
import {name as appName} from './app.json'
import React from 'react'
import {Provider} from 'react-redux'

import storeConfig from './src/store/storeConfig'

//Configurando a url Padrão do Sistema
import axios from 'axios'
axios.defaults.baseURL = 'https://insta-based.firebaseio.com/'

// Estou criando o store a partir do storeConfig
const store = storeConfig()

// Estou criando um Provider com o store configurado
const Redux = () => (
    <Provider store={store}>
        <Navigator/>
    </Provider>
)
AppRegistry.registerComponent(appName, () => Redux);
