angular.module('authtokenModule', [])
   // ===================================================
     // auth factory to login and get information
     // inject $http for communicating with the API
     // inject $q to return promise objects
     // inject AuthToken to manage tokens
     // ===================================================
     .factory('Auth', function($rootScope, $http, $q, AuthToken, options, $cookieStore) {
   
     // create auth factory object
     var authFactory = {};
   
     // register a user
    //  authFactory.register = function(registerData) {
    //  // return the promise object and its data
    //  return $http.post(options.API_URL + 'users', registerData)
    //   .success(function(data) {
    //     // AuthToken.setToken(data.access_token);
    //     var data = data;
    //     return data;
    //   });
    // };
   
   
     // log a user
     authFactory.login = function(loginData, cb) {
      
     // return the promise object and its data
     return $http.post(options.API_URL + 'users/authenticate', loginData)
      .success(function(data) {

        //console.log(data);
   
        AuthToken.setToken(data.token);
        cb(data);
      })
      .error(function(err) {
            cb(err);
          });
    };
   
     // log a user out by clearing the token
     authFactory.logout = function() {
       // clear the token
       AuthToken.setToken();
   
       return true;
    };
   
     // check if a user is logged in
     // checks if there is a local token
     authFactory.isLoggedIn = function() {
      
      var response;
   
      if ($cookieStore.get('sp_token'))
      {
        response = true;
      }
      else
      {
        response = false;
      }
   
      return response;
   
     };
   
     // get the logged in user (Ignore)
     authFactory.getUser = function(cb) {
      if ($cookieStore.get('sp_token'))
      {
        return $http.get(options.API_URL + 'users/me', {}) 
        .success(function(data) {
          cb(data);
          return data;
        });
      } else {
        return false;
        //return $q.reject({ message: 'User has no token.' });
      }
     };
   
     // return auth factory object
     return authFactory;
   
    })
   
     // ===================================================
     // factory for handling tokens
     // inject $window to store token client-side
     // ===================================================
     .factory('AuthToken', function($cookieStore) {
      // Angular Authentication 167
   
      var authTokenFactory = {};
   
     // get the token out of local storage
     authTokenFactory.getToken = function() {
      return $cookieStore.get('sp_token');
     };
   
     // function to set token or clear token
     // if a token is passed, set the token
     // if there is no token, clear it from local storage
     authTokenFactory.setToken = function(token) {
      if (token)
        $cookieStore.put('sp_token', token);
      else
        $cookieStore.remove('sp_token');
        return true;
     };
   
     return authTokenFactory;
   
    })
   
     // ===================================================
     // application configuration to integrate token into requests
     // ===================================================
     .factory('AuthInterceptor', function($q, $location, AuthToken, $cookieStore) {
   
      var interceptorFactory = {};
   
     // this will happen on all HTTP requests
     interceptorFactory.request = function(config) {
   
     // grab the token
     var token = $cookieStore.get('sp_token');
   
     // if the token exists, add it to the header as x-access-token
     if (token)
      config.headers['x-access-token'] = token;
   
     return config;
    };
   
    // // happens on response errors
    // interceptorFactory.responseError = function(response) {
   
    //  // if our server returns a 403 forbidden response
    //  if (response.status == 403)
    //   $location.path('/login');
   
    //  // return the errors from the server as a promise
    //  return $q.reject(response);
    // };
   
    return interceptorFactory;
   
    });