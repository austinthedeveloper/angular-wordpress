angular.module('wpApi', []);
angular.module('wpApi')
  .factory('wpService', function($http, $q) {
    var wpUrl = SITEURL;
    return {
      posts: function(post) {
        var delay = $q.defer();
        var postNumber = post || '';
        $http.get(wpUrl + 'posts/' + postNumber)
          .success(function(data) {
            delay.resolve(data);
          });

        return delay.promise;
      }
    };
  })
  .directive('getPosts', function(wpService) {
    return {
      template: '<md-list><md-list-item ng-repeat="post in posts">{{post.title.rendered}}</md-list-item></md-list>',
      link: function($scope, elem, attrs) {
        wpService.posts().then(function(data) {
          $scope.posts = data;
        });
      }
    };
  })
  .directive('getPost', function(wpService) {
    return {
      template: '<md-list><md-list-item>{{post.title.rendered}}</md-list-item></md-list>',
      link: function($scope, elem, attrs) {
        var post = attrs.number;
        wpService.posts(post).then(function(data) {
          $scope.post = data;
        });
      }
    };
  });