const getSuggestions = require('../Places/getSuggestions')

it('should ', () => {
    const response = getSuggestions("Bole")
    expect(response.suggestions.length).not.toBe(0)
});


it('should ', () => {
    const response = getSuggestions("Bo")
    expect(response.suggestions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("Bo, Ad")
    expect(response.suggestions.length).not.toBe(0)
});


it('should ', () => {
    const response = getSuggestions("Addis, k")
    expect(response.suggestions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("nefas, l")
    expect(response.suggestions.length).not.toBe(0)
});


it('should ', () => {
    const response = getSuggestions("nefas, zzz")
    expect(response.suggestions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("k")
    expect(response.suggestions.length).not.toBe(0)
});