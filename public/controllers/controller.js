var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){

	var refresh = function(){
		$http.get('/getResume').success(function(response){			
			$scope.edulist = [];
			$scope.skilllist = [];
			$scope.projectlist = [];
			
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
		$scope.edu.type = 'edu';
		$http.post('/addItem', $scope.edu).then(function(response){
			refresh();
			$scope.edu = {};
		});
	}
	
	$scope.addSkill = function(){
		$scope.skill.type = 'skill';
		$http.post('/addItem', $scope.skill).then(function(response){
			refresh();
			$scope.skill = {};
		});
	}
	
	$scope.addProject = function(){
		$scope.project.type = 'project';
		$http.post('/addItem', $scope.project).then(function(response){
			refresh();
			$scope.project = {};
		});
	}
	
	$scope.remove = function(type, index){
		$http.post('/remove', {id:index}).then(function(response){
			refresh();
		});
	}

}]);
