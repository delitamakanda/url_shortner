(function(){
    'use strict';

    angular.module('scrumboard', ['ngRoute'])
        .controller('ScrumboardController', ScrumboardController,
        ['$scope', '$http', '$location', '$window', 'Login', 'Todos', ScrumboardController]);

        function ScrumboardController($scope, $http, $location, $window, Login, Todos){

            // notifications
            $scope.messages = {};

            $http.get('/message_api/inbox/')
            .then(function(response) {
                $scope.messages = response.data;
                console.log($scope.messages);
            }, function(error) {
                console.log(error);
            });

            $scope.markRead = function(index) {
                var id = $scope.messages[index].id;

                $http.post('/message_api/inbox/' + id + '/read/')
                .then(function(response) {
                    $scope.messages.splice(index, 1);
                }, function(error) {
                    console.log(error);
                });
            }

            $scope.markAllRead = function(index) {
                var id = $scope.messages[index].id;

                $http.post('/message_api/mark_all_read/')
                .then(function(response) {
                    $scope.messages.splice(0, $scope.messages.length);
                }, function(error) {
                    console.log(error);
                });
            }

            // add card to the list
            $scope.add = function(list, title) {
                var card = {
                    list: list.id,
                    title: title,
                };
                $http.post('/scrumboard/cards/', card)
                    .then(function(response){
                        list.cards.push(response.data);
                    }, function(){
                        console.log('error');
                    });
            };

            // create a new list
            $scope.create = function() {
                var data = {
                    name: $scope.name,
                };

                $http.post('/scrumboard/lists/', data)
                    .then(function(response) {
                        $scope.data.push(response.data)
                    }, function(){
                        console.log('error');
                    });
            };

            // delete a list
            $scope.confirmDelete = function(list) {
                var r = confirm('Are you sure to delete this list ?');
                if (r == true) {
                    $http.delete('/scrumboard/lists/' + list.id)
                        .then(function(){
                            $scope.data.splice(list, 1)
                        });
                }
            };

            // modelOptions
            $scope.modelOptions = {
                debounce: 500
            };


            //show hide popin
            $scope.addBoard = function(key, index) {
                $scope.showAddBoard=true;
            }

            $scope.hideBoard = function() {
                $scope.showAddBoard=false;
            }

            Login.redirectedIfNotLoggedIn();
            $scope.data = [];
            $scope.userData = [];
            $scope.logout = Login.logout;
            $scope.sortBy='story_points';
            $scope.reverse=true;
            $scope.showFilters=false;
            $scope.showAddBoard=false;
            $scope.currentUser = JSON.parse(localStorage.currentUser);

            // fetch all of your lists and cards
            $http.get('/scrumboard/lists').then(function(response){
                $scope.data = response.data;

                $http.get('/message_api/inbox/')
                .then(function(response) {
                    $scope.messages = response.data;
                });
            });

            // fetch user by id
            $http.get('/scrumboard/users/' + $scope.currentUser.id).then(function(response){
                $scope.userData = response.data;
            });

            // update User
            $scope.updateUser = function() {

                return $http.patch(
                    '/scrumboard/users/' + $scope.currentUser.id + '/',
                    $scope.userData
                );
            }

            // Todos
            $scope.newTodo = {};

            $scope.addTodo = function() {
                Todos.createTodo($scope.newTodo)
                    .then(function(res) {
                        $scope.todos.push(res.data);
                        $scope.newTodo.name = '';
                        $scope.newTodo.text = '';
                    }, function(error) {
                        console.log('error', error);
                    });
            };

            $scope.toggleCompleted = function(todo) {
                Todos.updateTodo(todo);
            }

            $scope.deletedTodo = function(id) {
                Todos.deleteTodo(id);
                $scope.todos = $scope.todos.filter(function(todo) {
                    return todo.id !== id;
                })
            }

            Todos.getTodos().then(function(res) {
                $scope.todos = res.data;

                $http.get('/message_api/inbox/')
                .then(function(response) {
                    $scope.messages = response.data;
                });

                return $scope.todos;
            });
        }
}());