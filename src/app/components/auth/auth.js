'use strict';

angular.module('jtx.auth', [
    'ngStorage',
    'jtx.api'
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index.login', {
                url: 'login',
                templateUrl: 'app/components/auth/login.html',
                controller: 'auth.login.ctrl'
            });
    }
])

.controller('auth.login.ctrl', ['$scope', '$resource', 'auth.service','$state',
    function($scope, $resource, AuthService,$state) {
        $scope.customLogin = function(credentials) {
            $scope.showErrors = false;
            AuthService.login(credentials).then(
                function(success) {
                    $state.go('index.home');
                },
                function(errors) {
                    if (errors[0] == "Unable to login with provided credentials.") {
                        $scope.errors = "Le mot de passe ou l'e-mail donnés sont incorrects.";
                        $scope.credentials.password = "";
                    } else {
                        $scope.errors = errors;
                    }
                    $scope.showErrors = true;
                });
        };

    }
])

//The AuthService object created by this factory offers methods related to longin and logout
.factory('auth.service', ['$injector', '$localStorage', '$q', 'API', '$location', '$rootScope',
    function($injector, $localStorage, $q, API, $location, $rootScope) {
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
                        $location.path('/');
                        return $q.reject(response);
                        //Returns a promise object containing the token
                    },
                    function(response) {
                        $localStorage.auth.token = null;
                        $localStorage.auth.user = null;
                        return $q.reject(response);
                    });
            },
            logout: function() {
                $localStorage.auth.token = null;
                $localStorage.auth.user = null;
            },
            isAuthenticated: function() {
                return $localStorage.auth.token !== null;
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

//The auth.interceptor object adds the security token delivred at user login
//to all the queries directed at the server API
.factory('auth.interceptor', ['auth.service', '$q','$injector',
    function(AuthService, $q,$injector) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if (AuthService.isAuthenticated() && !/\/off\//.test(config.url)) {
                    config.headers.Authorization = 'JWT ' + AuthService.getToken();
                }
                return config || $q.when(config);
            },
            response: function(response) {
                if (response.status === 401) {
                    AuthService.logout();
                    $injector.get('$state').go('index.login');
                }
                return response || $q.when(response);
            },
            responseError: function(response) {
                if (response.status === 401) {
                    AuthService.logout();
                    $injector.get('$state').go('index.login');
                }
                return $q.reject(response);
            }
        };
    }
]);
