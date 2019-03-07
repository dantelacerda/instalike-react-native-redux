const functions = require('firebase-functions');
const cors = require('cors')({origin: true})
const fs = require('fs')
const uuid = require('uuid-v4')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
    projectId: 'insta-based',
    keyFilename: 'insta-based-firebase.json'
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.uploadImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        try {
            //Escrevendo o arquivo em uma pasta temporária no formado base64
            fs.writeFileSync('/tmp/imageToSave.jpg', request.body.image, 'base64')

            //Pasta que vai ficar os arquivos no firebase
            const bucket = storage.bucket('insta-based.appspot.com')

            const id = uuid()
            bucket.upload('/tmp/imageToSave.jpg', {
                uploadType: 'media',
                destination: `/posts/${id}.jpg`,
                metadata: {
                    metadata: {
                        contentType: 'image/jpeg',
                        firebaseStorageDownloadTokens: id
                    }
                }
            }, (err, file) => {
                if(err) {

                    console.log(err)
                    return response.status(500).json({error: err})
                } else {

                    const fileName = encodeURIComponent(file.name)
                    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/' + bucket.name + '/o/' + fileName + '?alt=media&token=' + id

                    return response.status(201).json({imageUrl})
                }
            })
        } catch(err) {
            console.log(err)
            return response.status(500).json({error: err})
        }
    })
});
