myApp.controller('MeetingsController',
    ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
    //$scope.message = 'Yahoo!...';
        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        auth.$onAuth(function (authUser) {
            if(authUser) {
                var meetingsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/meetings');
                var meetingsInfo = $firebaseArray(meetingsRef);

                $scope.addMeeting = function () {
                    meetingsInfo.$add({
                        name: $scope.meetingname,
                        created_at: Firebase.ServerValue.TIMESTAMP
                    }).then(function () {
                        $scope.meetingname = '';
                    }); // promise
                } // AddMeetings
            } // User Authenticated
        }); // on Auth
}]); // Controller
