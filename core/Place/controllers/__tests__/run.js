const axios = require('axios')
const fs = require('fs')
const file = fs.createReadStream('/home/slxm/Tutorial/gimp/Zema/assets/cover.jpg')
const FormData = require('form-data')
const formData = new FormData()
const { localUrl } = require('../../../../config/env')
const { objToString, arrayToString } = require('../../../common/common')


formData.append('appSecret', 'JjkJB88fFtD9UmHjfazAkfvFsaf3pxkR')
formData.append('accessToken', 'eiuix2uwyru5li6zy9q7zcu0env1cpnrk1le1sdblp636cc187pk9b7g1bngnrzj5wk34irulj3d6hkvqel7os06w2po7enais')
formData.append('name', 'Jakaranda')
formData.append('category', 2)
formData.append('description', 'Open')
formData.append('location', objToString({
    latitude: '8.999',
    longitude: '38.998'
}))
formData.append('priceRange', 2)
formData.append('tags', 'expensive')
formData.append('uniqueHours', objToString({ openingTime: '3:00', 'closingTime': '12:00' }))
formData.append('workingDays', arrayToString([ 0, 1, 2, 3, 4, 5 ]))
formData.append('owner', 9)
formData.append('profilePicture', file)
formData.append('photo', file)

axios.default.post(localUrl + '/place/add', formData, {
    headers: formData.getHeaders()
})
    .then(response => console.log(response.data))
    .catch(err => console.error(err))