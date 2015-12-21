myApp.controller('CheckInsController',
    ['$scope', '$rootScope', '$routeParams', '$location', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', function($scope, $rootScope, $routeParams, $location, $firebaseObject, $firebaseArray, FIREBASE_URL) {

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
            }).then(function () {
                $location.path('/checkins/' + $scope.whichUser + '/' + $scope.whichMeeting + '/checkinsList');
            });
        }; //Add Checkin

        $scope.deleteCheckin = function (id) {
            var refDel = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + '/meetings/' + $scope.whichMeeting + '/checkins/' + id);
            var record = $firebaseObject(refDel);
            record.$remove(id);
        }; // Delete Checkin

    }]); // Controller
