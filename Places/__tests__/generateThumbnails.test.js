const generateThubnails = require('../generateThumbnail')

it('"Pass" Test for "png" generate thumbnails', async () => {
    const input_path = "images/test.png"
    const response = await generateThubnails(input_path)
    expect(response.status).toBe(200)
})

it('"Pass" test for "jpg" generate thumbnails', async () => {
    const input_path = "images/test.jpg"
    const response = await generateThubnails(input_path)
    expect(response.status).toBe(200)
})

it('"Pass" test for "svg" generate thumbnails', async () => {
    const input_path = "images/test.svg"
    const response = await generateThubnails(input_path)
    expect(response.status).toBe(200)
})


it('"Fail" test for "svg" generate thumbnails', async () => {
    const input_path = "images/test10.svg"
    const response = await generateThubnails(input_path)
    expect(response.status).toBe(400)
});


it('"Pass" test for "jpeg" generate thumbnails', async () => {
    const input_path = "images/test.jpeg"
    const response = await generateThubnails(input_path)
    expect(response.status).toBe(200)
})

it('"Pass" test for "gif" generate thumbnails', async () => {
    const input_path = "images/test.gif"
    const response = await generateThubnails(input_path)
    expect(response.status).toBe(200)
})

it('"Fail" test for generate thumbnails', async () => {
    const input_path = "images/test.pdf"
    const response = await generateThubnails(input_path)
    expect(response.status).toBe(400)
})
