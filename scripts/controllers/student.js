'use strict';

/**
 * @ngdoc function
 * @name coeducateApp.controller:StudentCtrl
 * @description
 * # StudentCtrl
 * Controller of the coeducateApp
 */
angular.module('coeducateApp')
  .controller('StudentCtrl', function ($scope,$http,user) {
    
  	$scope.responsiveWidth = '900px';
  	$scope.selected = 'splash';
  	$scope.changepage = function(){
        // alert("nice it is calling");
  		$scope.selected = 'categories';
  	}

    $scope.allScores={};

    $scope.histroySet = [];

    $scope.user = user;

    function shuffle(array) {
          var currentIndex = array.length, temporaryValue, randomIndex ;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
    }

    $scope.categories = [];

    $http({method: 'GET', url: 'categories.json'}).
        success(function(data, status, headers, config) {
          
          // console.log("This is categories"+ JSON.stringify(data));
          for (var i = 0; i < data.length; i++) {
            $scope.categories.push(data[i]);
            shuffle($scope.categories[i].quizzes);
          };
          
          console.log($scope.categories);
        }).
        error(function(data, status, headers, config) {
          
        });  


    $scope.$watch('category',function(newval, oldVal){

        console.log('newval' + JSON.stringify(newval) + 'oldVal' + JSON.stringify(oldVal));

        if(newval !== oldVal){
            var n = newval.name;
            if(n === 'profile'){
                $scope.selected = newval.name;
            }else{
                $scope.selected = 'category';
            }
        }


        // console.log("This is value"+newval.name);


    },true);

    document.addEventListener('main', function(e){
    	$scope.$apply(function() {
                $scope.selected = 'categories';
            });


    });

    document.addEventListener('quiz-finished', function(e){
      // socket.emit('examStarted',{sender:user.username});
      console.log(e.detail.category);

      console.log(JSON.stringify($scope.allScores[e.detail.category.name]));
      var result = {
        // assignQuestionSetId:  
        name: e.detail.category.name,
        corrects: 0,
        details:[]
      };
      for (var i = 0; i < $scope.allScores[e.detail.category.name].length; i++) {
          var set = {
            question: e.detail.category.quizzes[i].question,
            time: e.detail.category.quizzes[i].time,
            choices: e.detail.category.quizzes[i].choices,
            answer: e.detail.category.quizzes[i].answer,
            givenAnswer: $scope.allScores[e.detail.category.name][i].userAnswer,
            actualTime: $scope.allScores[e.detail.category.name][i].time,
            score: $scope.allScores[e.detail.category.name][i].score
          }

          result.corrects += $scope.allScores[e.detail.category.name][i].score
          result.details.push(set);
      };
      
      $scope.histroySet.push(result);
      console.log($scope.histroySet)
      // console.log(JSON.stringify($scope.histroySet));
    });

  });
