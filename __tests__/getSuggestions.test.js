const getSuggestions = require('../Places/getSuggestions')

it('should ', () => {
    const response = getSuggestions("Bole", 5)
    console.log("On Sending: Bole")
    console.log(response)
    expect(response.suggestions[0]).toEqual({
        major: "Addis Ababa",
        minor: "Bole"
    })
});

it('should ', () => {
    const response = getSuggestions("Bole", 1)
    console.log("On Sending: Bole")
    console.log(response)
    expect(response.suggestions.length).toBe(1)
});

it('should ', () => {
    const response = getSuggestions("Bo", 5)
    console.log("On Sending: Bo")
    console.log(response)
    expect(response.suggestions[0]).toEqual({
        major: "Addis Ababa",
        minor: "Bole"
    })
});

it('should ', () => {
    const response = getSuggestions("Bo, Ad", 5)
    console.log("On Sending: Bo, Ad")
    console.log(response)
    expect(response.suggestions[0]).toEqual({
        major: "Addis Ababa",
        minor: "Bole"
    })
});


it('should ', () => {
    const response = getSuggestions("Addis, k", 5)
    console.log("On Sending: Addis, k")
    console.log(response)
    expect(response.suggestions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("nefas, l", 5)
    console.log("On Sending: nefas, l")
    console.log(response)
    expect(response.suggestions.length).not.toBe(0)
});


it('should ', () => {
    const response = getSuggestions("nefas, zzz", 5)
    console.log("On Sending: nefas, zzz")
    console.log(response)
    expect(response.suggestions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("k", 5)
    console.log("On Sending: k")
    console.log(response)
    expect(response.suggestions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("a", 5)
    console.log("On Sending: a")
    console.log(response)
    expect(response.suggestions[1]).toEqual({
        major: "Addis Ababa",
        minor: "Akaki Kality"
    })
});