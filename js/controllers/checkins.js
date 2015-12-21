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

        /* Initialize filter */
        $scope.filterParam = {
            order: 'firstname',
            direction: null,
            query: '',
            recordId: ''
        };

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

        $scope.pickRandom = function () {
            var whichRecord = Math.round(Math.random() * (checkinsList.length - 1));
            $scope.filterParam.recordId = checkinsList.$keyAt(whichRecord);
        }; // Pick Random

        $scope.showLove = function (myCheckin) {
            myCheckin.show = !myCheckin.show;

            if(myCheckin.userState == 'expanded') {
                myCheckin.userState = '';
            } else {
                myCheckin.userState = 'expanded';
            }
        }; // show Love

        $scope.giveLove = function (myCheckin, myGift) {
            var refLove = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + '/meetings/' + $scope.whichMeeting + '/checkins/' + myCheckin.$id + '/awards');
            var checkinsArray = $firebaseArray(refLove);
            checkinsArray.$add({
                name: myGift,
                created_at: Firebase.ServerValue.TIMESTAMP
            });
        }; // give love

    }]); // Controller
