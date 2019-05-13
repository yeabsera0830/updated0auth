const signUpUsingPhone = require("./signUpUsingPhone")

it('"Passing" Test for Signing Up with Phone', async () => {
    const phoneNumber = "09090909"
    const password = "12345678"
    const response = await signUpUsingPhone(phoneNumber, password)
    expect(response.status).toBe(200)
});