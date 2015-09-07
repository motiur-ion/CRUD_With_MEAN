	angular.module('crudApp',[])
	.controller('crudCtrl',function ($scope,$http) {
		
		var refresh =function () {		
		$http.get('/contacts').success(function (res) {
				
				$scope.contactlist = res;
				$scope.contact = "";		
		});
		};
		refresh();
		
		
		
		$scope.addcontact = function () {	
			$http.post('/contacts',$scope.contact).success(function (res) {
				refresh();			   
			});
		
		};
		
		$scope.remove = function (id) {			
			$http.delete('/contacts/'+id).success(function (res) {
				refresh();
			});	
		
		};
		
		
		$scope.edit = function (id) {
		
			$http.get('/contacts/'+id).success(function (res) {
				$scope.contact = res;
			});
		
		};
		
		
		$scope.update = function () {
			$http.put('/contacts/'+$scope.contact._id,$scope.contact).success(function (res) {
				refresh();
			});
		
		};
		
		
		$scope.clear = function () {
			$scope.contact ="";
		};
		
	
	});