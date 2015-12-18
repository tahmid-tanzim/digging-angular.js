myApp.controller('MeetingsController',
    ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
    //$scope.message = 'Yahoo!...';
        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        auth.$onAuth(function (authUser) {
            if(authUser) {
                var meetingsRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/meetings');
                var meetingsInfo = $firebaseArray(meetingsRef);

                $scope.meetings = meetingsInfo;

                /* Loaded first time */
                meetingsInfo.$loaded().then(function (data) {
                    console.log("Meetings data: ");
                    console.log(data);
                    $rootScope.howManyMeetings = meetingsInfo.length;
                }); // Make sure meetings data is loaded.

                /* Watch for new update */
                meetingsInfo.$watch(function (data) {
                    $rootScope.howManyMeetings = meetingsInfo.length;
                });

                $scope.addMeeting = function () {
                    meetingsInfo.$add({
                        name: $scope.meetingname,
                        created_at: Firebase.ServerValue.TIMESTAMP
                    }).then(function () {
                        $scope.meetingname = '';
                    }); // promise
                } // AddMeetings

                $scope.deleteMeeting = function (key) {
                    meetingsInfo.$remove(key);
                } // deleteMeeting

            } // User Authenticated
        }); // on Auth
}]); // Controller
