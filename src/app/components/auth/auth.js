'use strict';

angular.module('jtx.auth', [
    'ngStorage',
    'jtx.api'
])

.factory('auth.service', ['$injector', '$localStorage', '$q', 'API', '$location', '$rootScope',
    function ($injector, $localStorage, $q, API, $location, $rootScope) {
        if ($localStorage.auth === undefined) {
            $localStorage.auth = {
                token: null,
                user: null
            };
        }
        return {
            login: function(credentials, resultLogin) {
                return $injector.get('$http').post(API.route('api-token-auth/'), credentials).then(
                    function(response) {
                        $localStorage.auth.token = response.data.token;
                        //$localStorage.auth.user = response.data.user;
                        $location.path('/');
                        return response.data.user;
                    },
                    function(response) {
                        $localStorage.auth.token = null;
                        $localStorage.auth.user = null;
                        //$location.path('/login');
                        return $q.reject();
                    });
            },
            logout: function() {
                $localStorage.auth.token = null;
                $localStorage.auth.user = null;
            },
            isAuthenticated: function() {
                return $localStorage.auth.token != null;
            },
            getToken: function() {
                return $localStorage.auth.token;
            },
            getUser: function() {
                return $localStorage.auth.user;
            }
        };
    }
])

.factory('auth.interceptor', ['auth.service', '$q',
    function (AuthService, $q) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if (AuthService.isAuthenticated() && !/\/off\//.test(config.url)) {
                    config.headers.Authorization = 'JWT ' + AuthService.getToken();
                }

                // config.params = config.params || {};
                // // to improve: necessary for ui.bootstrap ; and the token is useless for static files
                // if (AuthService.isAuthenticated() && /^((http)|[^a-z])/.test(config.url)) {
                //     config.params["bearer"] = AuthService.getToken();
                // }
                return config || $q.when(config);
            },
            response: function(response) {
                if (response.status === 401) {
                    AuthService.logout();
                    // TODO: Redirect user to login page.
                }
                return response || $q.when(response);
            },
            responseError: function(response) {
                if (response.status === 401) {
                    AuthService.logout();
                    // TODO: Redirect user to login page.
                }
                return $q.reject(response);
            }
        };
}]);
