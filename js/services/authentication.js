myApp.factory('Authentication',
    ['$rootScope', '$firebaseAuth', 'FIREBASE_URL', function ($rootScope, $firebaseAuth, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    return {
        login: function (user) {
            $rootScope.message = 'Welcome ' + $scope.user.email;
        },
        register: function (user) {
            auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function (newUser) {
                /* Save user's information */
                var registrationReference = new Firebase(FIREBASE_URL + 'users');
                registrationReference
                    .child(newUser.uid)
                    .set({
                        user_id: newUser.uid,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        created_at: Firebase.ServerValue.TIMESTAMP
                    }); // user info

                $rootScope.message = 'Welcome ' + user.firstname + '!, \nThanks for registering.';
            }).catch(function (error) {
                $rootScope.message = error.message;
            }); // createUser
        } //register
    };
}]); // factory