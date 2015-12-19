myApp.controller('CheckInsController',
    ['$scope', '$rootScope', '$routeParams', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', function($scope, $rootScope, $routeParams, $firebaseObject, $firebaseArray, FIREBASE_URL) {

        $scope.whichMeeting = $routeParams.mId;
        $scope.whichUser = $routeParams.uId;

        var ref = new Firebase(FIREBASE_URL + 'users/' +
                $scope.whichUser + '/meetings/' +
                $scope.whichMeeting + '/checkins'
        );

        var checkinsList = $firebaseArray(ref);
        $scope.checkins = checkinsList;

        $scope.addCheckin = function () {
            var checkinsInfo = $firebaseArray(ref);
            checkinsInfo.$add({
                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                email: $scope.user.email,
                created_at: Firebase.ServerValue.TIMESTAMP
            });
        }; //Add Checkin
    }]); // Controller
