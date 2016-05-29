'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state','AuthenticationService', function($scope, $http, $state,AuthenticationService) {
    $scope.user = {};
    $scope.authError = null;

    function init(){
      // reset login status
      AuthenticationService.ClearCredentials();
      //AuthenticationService.getToken();
    };

    $scope.login = function() {
      $scope.authError = null;
      // Try to login


      AuthenticationService.Login($scope.user.email, $scope.user.password,$scope.form.role, function (response) {
            if (true) {
                  $state.go('app.dashboard-v1');
                     AuthenticationService.SetCredentials($scope.user.email, $scope.user.password,response.auth_token);
                     $http.defaults.headers.common['token'] = response.auth_token;
            } else {
                  $scope.authError = response.message;
                  vm.dataLoading = false;
            }
        });

    };

    init();

  }])
;
