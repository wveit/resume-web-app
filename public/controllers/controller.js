var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	
	$scope.edulist = [
		{type:'edu', school:'the school', degree:'the degree', last_year:'1998'},
		{type:'edu', school:'waka school', degree:'waka degree', last_year:'2001'}
	];

	$scope.skilllist = [
		{type:'skill', skill:'air guitar'},
		{type:'skill', skill:'sharpening pencils'}
	];
	
	$scope.projectlist = [
		{type:'project', title:'awesome air guitar', description:'video of some air guitar'},
		{type:'project', title:'pennsylvania mania', description:'documentary about the history of pencils in pennsylvania'}
	];

	console.log("Hello World from controller");



	var refresh = function(){
		
		$http.get('/resume').success(function(response){
			console.log("I got the data I requested");
			console.log(response);
			
			$scope.edulist = [];
			$scope.skilllist = [];
			$scope.projectlist = [];
			
			for(var i = 0; i < response.length; i++){
				var item = response[i];
				console.log(item);
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

}]);
