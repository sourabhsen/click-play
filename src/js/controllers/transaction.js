'use strict';

/* Controllers */
  // signin controller
app.controller('TransactionController', ['$rootScope','$scope', '$http', '$state','$stateParams','UserService', function($rootScope,$scope, $http, $state,$stateParams,UserService) {

    $scope.authError = null;

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
              debugger;
              $scope.getStoreTransaction();
       });


    $scope.getStoreTransaction = function() {
      $scope.authError = null;
         // Try to login
          UserService.GetStoreTransaction().then(function(response){
              $scope.strTransaction = response;
          });

       }



  }])
;