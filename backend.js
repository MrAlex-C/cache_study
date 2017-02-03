angular.module('backend', ['ngMockE2E', 'helpers']).run(['$httpBackend', 'Helpers', function($httpBackend, Helpers) {

    var items = [
      {id:1, name:'Item 1'},
      {id:2, name:'Item 2'},
      {id:3, name:'Item 3'}
    ];
    
    var counter = items.length;
    
    $httpBackend.whenGET('/api/items').respond(function(method, url, data, headers) {
      console.log("Getting items", items);
      
      return [200, items, {}];
    });
    
    $httpBackend.whenPOST('/api/items').respond(function(method, url, data, headers){
      
      var newItem = angular.fromJson(data);
      
      var existItem = Helpers.findById(items, newItem.id);
      if(existItem){
        newItem = angular.extend(existItem, newItem);
        console.log('Update item:', newItem);
      }
      else{
        newItem.id = ++counter;
        items.push(newItem);
        console.log('Create item:', newItem);
      }
      
      return [200, newItem, {}];
    });
    
    $httpBackend.whenDELETE(/\api\/items\/*/).respond(function(method, url, data, headers) {
      var id = url.split("/").slice(-1)[0]; 
      
      console.log("Delete item by id", id);
      
      Helpers.deleteById (items, id);
      return [200, {}, {}];
    });
    
    $httpBackend.whenGET(/.html/).passThrough()

}]);

