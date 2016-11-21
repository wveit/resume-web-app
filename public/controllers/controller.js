var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){

	console.log("Hello World from controller");

	var refresh = function(){
		console.log("calling refresh function");
		$http.get('/resume').success(function(response){
			//console.log("I got the data I requested");
			
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
		$http.post('/addEdu', $scope.edu).then(function(response){
			refresh();
			$scope.edu = {};
		});
	}
	
	$scope.addSkill = function(){
		$scope.skill.type = 'skill';
		$http.post('/addSkill', $scope.skill).then(function(response){
			refresh();
			$scope.skill = {};
		});
	}
	
	$scope.addProject = function(){
		$scope.project.type = 'project';
		$http.post('/addProject', $scope.project).then(function(response){
			refresh();
			$scope.project = {};
		});
	}

}]);
