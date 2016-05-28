angular.module('submissionCtrl', [])

.controller('submissionCtrl', function($scope, $http) {

    $scope.submissions = {};
    $scope.size = {};

    $http.get('https://still-earth-13848.herokuapp.com/api/submissions.json')
    .success(function(data) {
        console.log(data);
        $scope.submissions = data.reverse();
        $scope.size = Object.keys($scope.submissions).length + 1;
    });

})

.controller('askCtrl', function($scope, $http) {

    $scope.ask = {};
    $scope.size ={};

    $http.get('https://still-earth-13848.herokuapp.com/api/ask.json')
    .success(function(data) {
        $scope.ask = data;
        $scope.size = Object.keys($scope.ask).length + 1;
    });

})

.controller('singleSubmissionCtrl', function($scope, $http, $routeParams) {

    $scope.submission = {};

    $http.get('https://still-earth-13848.herokuapp.com/api/submissions/' + $routeParams.id + '.json')
    .success(function(data) {
        $scope.submission = data;
        $scope.correctData = getDate($scope.submission.created_at);
    });

    $scope.likeSubmission = function() {
        $http.put('https://still-earth-13848.herokuapp.com/api/submissions/' + $routeParams.id + '/like.json');
        $scope.$apply();
    };

    $scope.newComment = function(text) {
        $http.post('https://still-earth-13848.herokuapp.com/api/comments?text=' + text + '&submission_id=' + $routeParams.id + '.json');
        $scope.$apply();
    };

    $scope.likeComment = function(id) {
        $http.put('https://still-earth-13848.herokuapp.com/api/comments/' + id + '/like.json');
        $scope.$apply();
    };

    $scope.likeReply = function(id) {
        $http.put('https://still-earth-13848.herokuapp.com/api/replies/' + id + '/like.json');
        $scope.$apply();
    };

    $scope.getDate = function(createdat) {
        document.getElementById('time').innerHTML=createdat;
    };

})

.controller('newSubmissionCtrl', function($scope, $http) {

    $scope.submission = {};

    $scope.postNew = function(title, text, url) {
        if(!text) {
            $http.post('https://still-earth-13848.herokuapp.com/api/submissions?title=' + title + '&url=' + url + '.json')
            .success(function(data) {
                $scope.submission = data;
            });
        }
        else if(!url) {
            $http.post('https://still-earth-13848.herokuapp.com/api/submissions?title=' + title + '&text=' + text + '.json')
            .success(function(data) {
                $scope.submission = data;
            });
        }
        $scope.$apply(function() { $location.path("/submissions/" + $scope.submission.id); });
    };

});
