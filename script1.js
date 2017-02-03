// Code goes here
angular.module('app', ['ui.bootstrap'])
.controller('myController', ['$scope', '$http', function($scope, $http) {
  
    $scope.newItem = {};
    $scope.currentItem = null;
    
    function getItems (){
      $http.get('/csp/healthshare/study/rest/getTeachers').then(function(items) {
	      console.log(items);
          $scope.items = items.data;
      });
    }
    
    getItems();
    
    $scope.saveItem = function(item){
      item.is_edit = false;
      $http.post('/csp/healthshare/rest/saveTeachers', item).then(function(response){
        getItems();
        $scope.newItem = {};
      })
    }
    
    $scope.removeItem = function(item){
      $http.delete('/api/items/' + item.id).then(function(){
        getItems();
      })
    }
}]);