const getSuggestions = require('../Places/getSuggestion')

it('should ', () => {
    const response = getSuggestions("Bole")
    expect(response.suggesstions.length).not.toBe(0)
});


it('should ', () => {
    const response = getSuggestions("Bo")
    expect(response.suggesstions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("Bo, Ad")
    expect(response.suggesstions.length).not.toBe(0)
});


it('should ', () => {
    const response = getSuggestions("Addis, k")
    expect(response.suggesstions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("nefas, l")
    expect(response.suggesstions.length).not.toBe(0)
});


it('should ', () => {
    const response = getSuggestions("nefas, zzz")
    expect(response.suggesstions.length).not.toBe(0)
});

it('should ', () => {
    const response = getSuggestions("zzz")
    expect(response.suggesstions.length).toBe(0)
});