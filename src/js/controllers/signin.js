'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state','AuthenticationService', function($scope, $http, $state,AuthenticationService) {
    $scope.user = {};
    $scope.authError = null;
    
    function init(){
      // reset login status
      AuthenticationService.ClearCredentials();
    };

    $scope.login = function() {
      $scope.authError = null;
      // Try to login
     /* $http.post('api/login.json', {email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = 'Email or Password not right';
        }else{
          $state.go('app.dashboard-v1');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });*/
      
      AuthenticationService.Login($scope.user.email, $scope.user.password, function (response) {
            if (true) {
                AuthenticationService.SetCredentials($scope.user.email, $scope.user.password);
                 $state.go('app.dashboard-v1');
            } else {
                  $scope.authError = 'Server Error';
                  vm.dataLoading = false;
            }
        });

    };
   
    init();

  }])
;