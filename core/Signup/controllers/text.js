const twilio = require('twilio')
const { signUpUsingPhoneNumber } = require('./signupPhone')

const username = 'AC5849dfd758ef7d639ff83c6b970bf81f'
const password = '1a46c2c42d7b2b04d9da1cb4a05f412c'
const serviceID = 'VA286236ac77aa1e4427e84c01cf4039f7'
const client = new twilio(username, password)

exports.sendText = async (phoneNumber) => {
    var check = null
        try {
            await client.verify.services(serviceID)
             .verifications
             .create({to: phoneNumber, channel: 'sms'})

            try {
                const { status } = await client.verify.services(serviceID)
                    .verifications
                    .create({to: phoneNumber, channel: 'sms'})
                check = status
            } catch(err) {
                console.log(err)
                return {
                    status: 400,
                    message: "Invalid phone number"
                }
            }
        } catch(err) {
            console.log(err)
            return {
                statua: 400,
                message:"Invalid request"
            }
        }
        if (check === 'pending') {
            return {
                status: 200,
                message: "Code Sent"
            }
        }
}

exports.verify = async (to, password, code) => {
    const { status } = await client.verify.services(serviceID)
        .verificationChecks
        .create({ to, code })
    if (status === 'approved') {
        return await signUpUsingPhoneNumber(to, password)
    } else {
        return {
            status: 400,
            message: 'Verification Failure'
        }
    }
}
