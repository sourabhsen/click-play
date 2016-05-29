
(function () {
 'use strict';

app.factory('UserService', UserService);

    UserService.$inject = ['$http','$q','environmentUtil'];
    function UserService($http,$q,environmentUtil) {
        var service = {};

        service.GetByUsername = GetByUsername;
        service.GetStoreTransaction = GetStoreTransaction;
        service.GetPasscodeAuthentication = GetPasscodeAuthentication;

        return service;

        function GetByUsername(uname,pkey,role) {
                var deferredGet = $q.defer();
                var restUrl = '/clickandpay/login';
                var dataObj = {
                    username: uname,
                    password: pkey,
                    role: role
                };

               var httpConfig = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    method: 'POST',
                    params: dataObj,
                    url: environmentUtil.getMCAppUrl() + restUrl
                };


              $http(httpConfig).success(function (data) {
                deferredGet.resolve(data);
               }).error(function (error) {
               deferredGet.resolve('true');
              });

             return deferredGet.promise;
        }

        function GetStoreTransaction(){
                var deferredStrGet = $q.defer();
                var restUrl = '/clickandpay/myacc/storetransactions';
                var httpConfig = {
                           headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                           method: 'POST',
                           url:  environmentUtil.getMCAppUrl() + restUrl
                       };

                   $http(httpConfig).success(function (data) {
                       deferredStrGet.resolve(data);
                   }).error(function (error) {
                      deferredStrGet.reject(error);
                  });

                    return deferredStrGet.promise;
        }

        function GetPasscodeAuthentication(passcode){
                 var deferredStrGet = $q.defer();
                 var restUrl = '/clickandpay/myacc/passcode';
                 var httpConfig = {
                            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                            method: 'POST',
                            params: passcode,
                            url:  environmentUtil.getMCAppUrl() + restUrl
                        };

                    $http(httpConfig).success(function (data) {
                        deferredStrGet.resolve(data);
                    }).error(function (error) {
                       deferredStrGet.reject(error);
                   });

                     return deferredStrGet.promise;
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
