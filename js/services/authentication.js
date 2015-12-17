myApp.factory('Authentication',
    ['$rootScope', '$location', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', function ($rootScope, $location, $firebaseAuth, $firebaseObject, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        auth.$onAuth(function (authUser) {
            if (authUser) {
                /* get UID */
                var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
                /* get User Object */
                var userObj = $firebaseObject(userRef);
                $rootScope.currentUser = userObj;
            } else {
                $rootScope.currentUser = null;
            }
        });

        return {
            login: function (user) {
                auth.$authWithPassword({
                    email: user.email,
                    password: user.password
                }).then(function (authUser) {
                    $location.path('/success');
                }).catch(function (error) {
                    $rootScope.message = error.message;
                });
            }, // login

            logout: function () {
                return auth.$unauth();
            }, // logout

            requireAuth: function () {
                return auth.$requireAuth();
            }, // require Authentication

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
            } // register
        };
    }]); // factory