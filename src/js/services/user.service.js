
(function () {
 
 'use strict';

app.factory('UserService', UserService);
	
    UserService.$inject = ['$http','$q','environmentUtil'];
    function UserService($http,$q,environmentUtil) {
        var service = {};
 
      
       
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
 
        return service;
 
    
        function GetByUsername(uname,pkey) {
                var deferredGet = $q.defer();
                var restUrl = '/clickandpay/j_spring_security_check';
                var data = {
                    username: uname,
                    psword:    pkey
                };   

                var httpConfig = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    method: 'POST',
                    params: data,
                    url: environmentUtil.getMCAppUrl() + restUrl
                };

               /* $http(httpConfig).success(function (data) {
                    deferredGet.resolve(data);
                }).error(function (error) {
                    deferredGet.resolve(data);
                }); */
                deferredGet.resolve(data);
                return deferredGet.promise;
        }
 
        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }
 
        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
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