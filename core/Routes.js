module.exports = {
    root: '/',
        removeAll: '/remove/all',
        removeUsers: '/remove/users',
        removePlaces: '/remove/places',
        removeReviews: '/remove/reviews',
        addEverything: '/add/all',
        addUsers: '/add/users',
        addPlaces: '/add/places',
        addReviews: '/add/reviews',
    signup: '/signup',
        verifyAndSignUpPhone: '/phone',
        sendText: '/phone/send/',
        signupFacebook: '/facebook',
        login: '/login',
        loginPhone: '/phone',
        loginFacebook: '/facebook',
    address: '/address',
        getReadableAddress: '/readable',
        getCoordinatesFromAddress: '/coordinates',
        getSuggestions: '/suggestions',
    getUser: '/user/:id',
    getReviewTemp: '/review/:id',
    getPlace: '/place/:id',
    deletePlace: '/place/:id',
    place: '/places',
        addPlace: '/add',
        getNearbyPlaces : '/nearby',
        getNewPlaces: '/new',
        getTrendingPlaces: '/trending',
    search: '/search',
        getBusinessProfile: '/place',
        searchPlaces: '/places',
        searchPerson: '/person',
        searchSuggestions: '/suggestions',
    categories: '/categories',
        getCategoryOrder: '/order',
        saveCategoryOrder: '/saveOrder',
    bookmarks: '/bookmarks',
        addBookmark: '/add',
        removeBookmark: '/remove',
    rate: '/rate',
    review: '/review',
        getReview: '/',
        likeReview: '/like',
        unlikeReview: '/unlike',
        addReview: '/add',
    uploadPhoto: '/upload/photo',
    getPlaceThumbnail: '/Places/thumbnails/:id',
    getImage: '/store/:id',
    saveBasicInfo: '/saveBasicInfo'
}