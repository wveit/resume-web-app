var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	
	
	var refresh = function(){
		$scope.edulist = [];
		$scope.skilllist = [];
		$scope.projectlist = [];
		
		$scope.inputEdu = {};
		$scope.inputSkill = {};
		$scope.inputProject = {};
			
		$http.get('/getResume').success(function(response){			
			for(var i = 0; i < response.length; i++){
				var item = response[i];
				if(item.type == 'edu')
					$scope.edulist.push(item);
				else if(item.type =='skill')
					$scope.skilllist.push(item);
				else if(item.type == 'project')
					$scope.projectlist.push(item);
			}
		});
	};
	
	refresh();
	


	
	$scope.addEdu = function(){
		$scope.inputEdu.type = 'edu';
		$http.post('/addItem', $scope.inputEdu).then(function(response){
			refresh();
		});
	}
	
	$scope.addSkill = function(){
		$scope.inputSkill.type = 'skill';
		$http.post('/addItem', $scope.inputSkill).then(function(response){
			refresh();
		});
	}
	
	$scope.addProject = function(){
		$scope.inputProject.type = 'project';
		$http.post('/addItem', $scope.inputProject).then(function(response){
			refresh();
		});
	}
	
	$scope.remove = function(type, index){
		$http.post('/remove', {_id:index}).then(function(response){
			refresh();
		});
	}
	
	
	$scope.edit = function(item){
		if		(item.type == 'edu') 		$scope.inputEdu = Object.assign({}, item);
		else if	(item.type == 'skill') 		$scope.inputSkill = Object.assign({}, item);
		else if	(item.type == 'project')	$scope.inputProject = Object.assign({}, item);
		
		$(item.type + '_add').hidden = true;
		$(item.type + '_save').hidden = false;
		$(item.type + '_cancel').hidden = false;
	}
	
	$scope.cancelEdit = function(item){
		if		(item.type == 'edu') 		$scope.inputEdu = {};
		else if	(item.type == 'skill') 		$scope.inputSkill = {};
		else if	(item.type == 'project') 	$scope.inputProject = {};
		
		$(item.type + '_add').hidden = false;
		$(item.type + '_save').hidden = true;
		$(item.type + '_cancel').hidden = true;
	}
	
	$scope.saveChange = function(item){
		$http.post('/edit', item).then(function(response){
			refresh();
			$scope.cancelEdit(item);
		});
	}
	
	function $(id){
		return document.getElementById(id);
	}
	
}]);
