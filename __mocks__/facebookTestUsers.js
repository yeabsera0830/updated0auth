FBTestUsers = require('fb-test-users');
fbTestUsers = new FBTestUsers({appID: '327743644352620', secret: 'e4965fdc2a28b075f427df918e2ba649'});

/*
fbTestUsers.create({}, function(error, result){
    console.log(result);
});
*/


fbTestUsers.list(100, function(error, users){
    console.log(users);
});