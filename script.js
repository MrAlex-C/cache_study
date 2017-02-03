angular.module('app', ['ui.bootstrap'])
	.controller('myController', ['$scope', '$http', function($scope, $http) {
  
	    $scope.newItem = {};
	    $scope.currentItem = null;
	    
	    function getItems (){
	      $http.get('/csp/healthshare/study/rest/getTeachers').then(function(items) {
	          console.log(items);
	          $scope.items = items.data.data;
	      });
	    }
	    
	    getItems();
	    
	    $scope.saveItem = function(item){
	      item.is_edit = false;
	      $http.post('/csp/healthshare/study/rest/saveTeacher', item).then(function(response){
	        getItems();
	        $scope.newItem = {};
	      })
	    }
	    
	    $scope.removeItem = function(item){
	      $http.post('/csp/healthshare/study/rest/deleteTeacher/' + item.ID).then(function(){
	        getItems();
	      })
	    }
	}]);