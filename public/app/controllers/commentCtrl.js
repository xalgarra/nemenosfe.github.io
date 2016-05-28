angular.module('commentCtrl', [])

.controller('commentCtrl', function($scope, $http, $routeParams) {

    $scope.comment = {};
    $http.get('https://still-earth-13848.herokuapp.com/api/comments/' + $routeParams.id)
    .success(function(data) {
        $scope.comment = data;
    });

    $scope.newReply = function(text) {
        $http.post('https://still-earth-13848.herokuapp.com/api/replies?text=' + text + '&comment_id=' + $routeParams.id);
        $scope.$apply();
    };
})

.controller('userCommentsCtrl', function($http, $scope, $routeParams) {

    $scope.comments = {};
    $http.get('https://still-earth-13848.herokuapp.com/api/users/' + $routeParams.id + '/comments')
    .success(function(data) {
        $scope.comments = data;
    });

});
