var Reviews = []

function rand(max, min) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

const texts = [
    "Had dinner with girl friends. Menu is perfect, something for everyone. Service was awesome and Jason was very accommodating. Will be back definitely!",
    "Hello. Please give our thanks to the Manager(s) and others for the wonderful room and bottle of sparkling wine for our Anniversary stay. We had an amazing time. The room was so comfortable, the food at Echo absolutely spectacular (we ate two meals there). Our waitress was just wonderful. Looking forward to staying with you in the future. What a great place! ",
    "Rachel at the Pool (drinks server) was so gorgeous. We chatted with her all weekend and she played with the kids. She's an asset to the hotel esp for people with families. I saw other attendants playing with the kids too which is so welcoming. Rachel was gorgeous. Give her a raise! ",
    "I had lunch with some of my colleagues at Echo on Day 1. I had the wedge salad - it was delicious. On Night 2, I enjoyed a drink at the bar. I had a Margarita. The service was excellent. ",
    "Dinner in the King and Prince's new restaurant-ECHO (open only 12 days) interesting menu, wonderful meal that was perfectly served by our waiter, Peter, who also filled us in on the local community. Room service breakfast was exactly on time, hot (not warm) food and oh so good. All in all, a perfect stay!!"
]

var j = null
for (let i = 0; i < 13; ++i) {
    var reviewsModel = {
        reviewID: null,
        reviewer: null,
        reviewedPlace: null,
        text: null,
        likedBy: []
    }
    reviewsModel.reviewID = Reviews.length + 1
    found = null
    while (true) {
        number = rand(13, 1)
        found = Reviews.find(review => review.reviewer == number)
        if (found == null) {
            reviewsModel.reviewer = number
            break
        } else continue
    }

    found = null
    while (true) {
        number = rand(89, 1)
        found = Reviews.find(review => review.reviewedPlace == number)
        if (found == null) {
            reviewsModel.reviewedPlace = number
            break
        } else continue
    }
    reviewsModel.text = texts[rand(4, 0)]
    j = 0;
    k = rand(13, 1)
    while (true) {
        number = rand(13, 1)
        if (j === k) {
            break
        }
        else if (reviewsModel.likedBy.indexOf(number) < 0) {
            reviewsModel.likedBy.push(number)
            ++j
        } else continue
    }

    Reviews.push(reviewsModel)
}

function getArrayOfReviewsForPlace (placeID) {
    var placeReviews = []
    for (let i = 0; i < Reviews.length; ++i) {
        if (placeID === Reviews[i].reviewedPlace) {
            placeReviews.push(Reviews[i].reviewID)
        }
    }

    return placeReviews
}

function getArrayOfReviewsForUser (userID) {
    var userReviews = []
    for (let i = 0; i < Reviews.length; ++i) {
        if (userID == Reviews[i].reviewer) {
            userReviews.push(Reviews[i].reviewID)
        }
    }
    return userReviews
}

module.exports = { Reviews, getArrayOfReviewsForPlace, getArrayOfReviewsForUser }