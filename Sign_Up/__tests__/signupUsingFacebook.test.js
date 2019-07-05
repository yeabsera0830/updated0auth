const axios = require('axios')
const token = 'EAAIZCRdirl3wBABj23Aj1axrAjcM8FoaZAA5NAHlZC2gMJXz5CAtRxnSANWE8z9H3wVb3h7WkEIeRygqCZCLwxc8AaMXRZCcAaZAcqSDxWZC7Xk1WwEtDw1JdTfhp1DyVVIQSCO3gzxDO1in3wrvXgfFLSYZBwfvKhdZBnZCrK43VgeeF36So0HWV0TFp8vZBCc41fCqrbb5cCeI8HDY4tPO0SktBX8O8cCvp87fTKNEf20SgZDZD'
const User = require('../../model/User')
const signUpUsingFacebook = require('../signUpUsingFacebook')
const checkIfUserExists = require('../checkIfUserExists')
const connect = require('../../config/auth').connect
jest.setTimeout(40000)
jest.mock('axios')

const fetched = {
    "id": "2331171377167466",
    "first_name": "Yeabsera",
    "last_name": "Genene",
    "email": "yeabseragenene@yahoo.com",
    "picture":{
        "data":{
        "height": 50,
            "is_silhouette": false,
            "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2331171377167466&height=50&width=50&ext=1564907318&hash=AeRZwMQYxUb0IgCW",
            "width": 50
        }
    }
}

const returned = {
    data: fetched
}

axios.get.mockResolvedValue(returned)


const url = `https://graph.facebook.com/v3.3/me?fields=id,first_name,middle_name,last_name,email,picture&access_token=${token}`
it('"Pass" test for axios facebook', () => {
    axios.get(url).then(res => {
        expect(res.data.first_name).toEqual('Yeabsera')
    }).catch(err => console.log(err))
})

it('"Fail" test for axios facebook', () => {
    axios.get(url).then(res => {
        expect(res.data.first_name).not.toBeNull()
    })
})

jest.mock('../../model/User')
const saveReturn = {
    "zeilaToken": "w9wimgsgzxwpmzql23j8m8ixbk02o6aowyw8tzyczhj6ijzctoer9etn4vz7tz6adycsuzz3u2lznxz2hz322ox4j5w7zprf"
}
var newUser = new User()
newUser.save.mockResolvedValue(saveReturn)
User.countDocuments.mockResolvedValue(13)

jest.mock('../checkIfUserExists')
checkIfUserExists.mockResolvedValue(false)

jest.mock('../../config/auth')
connect.mockResolvedValue(true) 

it('should ', async () => {
    const response = await signUpUsingFacebook(token)
    expect(response.status).toBe(200)
})

