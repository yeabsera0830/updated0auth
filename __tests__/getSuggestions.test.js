const getSuggestions = require('../Places/getSuggestions')

it('should ', () => {
    const response = getSuggestions("Bole")
    console.log("On Sending: Bole")
    console.log(response)
    expect(response.suggestions[0]).toEqual({
        major: "Addis Ababa",
        minor: "Bole"
    })
});

it('should ', () => {
    const response = getSuggestions("Bo")
    console.log("On Sending: Bo")
    console.log(response)
    expect(response.suggestions[0]).toEqual({
        major: "Addis Ababa",
        minor: "Bole"
    })
});

it('should ', () => {
    const response = getSuggestions("Bo, Ad")
    console.log("On Sending: Bo, Ad")
    console.log(response)
    expect(response.suggestions[0]).toEqual({
        major: "Addis Ababa",
        minor: "Bole"
    })
});


it('should ', () => {
    const response = getSuggestions("Addis, k")
    console.log("On Sending: Addis, k")
    console.log(response)
    expect(response.suggestions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("nefas, l")
    console.log("On Sending: nefas, l")
    console.log(response)
    expect(response.suggestions.length).not.toBe(0)
});


it('should ', () => {
    const response = getSuggestions("nefas, zzz")
    console.log("On Sending: nefas, zzz")
    console.log(response)
    expect(response.suggestions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("k")
    console.log("On Sending: k")
    console.log(response)
    expect(response.suggestions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("a")
    console.log("On Sending: a")
    console.log(response)
    expect(response.suggestions[1]).toEqual({
        major: "Addis Ababa",
        minor: "Akaki Kality"
    })
});