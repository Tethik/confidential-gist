var module = angular.module("demo", []);

module.controller("MainCtrl", ['$scope', function($scope) {

  var hash = document.location.hash;
  if(hash.length > 1) {
    $scope.msg = "fetching gist and decrypting...";
    d = JSON.parse(atob(hash.substr(1, hash.length-1)));
    confide_gist.get(d.id, d.key, function(data) {
      $scope.$apply(function() {
        $scope.msg = data;
      });
    });
  }


  $scope.send = function(content) {
    var password = sjcl.codec.hex.fromBits(sjcl.random.randomWords(8));
    var msg = $scope.content;
    $scope.content = "encrypting and sending to gist...";
    confide_gist.put(msg, password, function(data) {
      console.log(data);
      $scope.$apply(function() {
        $scope.lol = data.id;
        $scope.url = document.location.href + "#" + btoa(JSON.stringify({ id: data.id, key: password }));
      });
    });
  };
}]);
