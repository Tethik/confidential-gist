confide_gist = {
  _req: function(method, url, callback, data) {
    var xmlhttp = new XMLHttpRequest();
    var url = url;

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status >= 200 && xmlhttp.status < 300) {
            var myArr = JSON.parse(xmlhttp.responseText);
            callback(myArr);
        }
    }
    xmlhttp.open(method, url, true);
    xmlhttp.send(data);

  },

  get: function(gist_id, key, callback) {
    var url = 'https://api.github.com/gists/'+gist_id;

    this._req('GET', url, function(data) {
      var content = "";

      for(var f in data.files) {
          var file = data.files[f];
          content += sjcl.decrypt(key, file.content);
      }

      console.log(data);

      callback(content);
    });
  },

  delete: function(gist_id, callback) {
    var url = 'https://api.github.com/gists/'+gist_id;
    this._req('DELETE', url, callback);
  },

  put: function(content, key, callback) {
    url = 'https://api.github.com/gists';

    var gist = {
      "public": false,
      "files": {
        "file1.txt": {
          "content": sjcl.encrypt(key, content)
        }
      }
    }

    this._req('POST', url, callback, JSON.stringify(gist));
  },
};

var key = "super secret";

confide_gist.put("lololol", key, function(data) {
  var id = data.id;
  console.log();
  console.log("POSTED");
  console.log(data);


  confide_gist.get(id, key, function(data) {
    console.log();
    console.log("GOT");
    console.log(data);

    confide_gist.delete(id, function(data) {
      console.log();
      console.log("DELETED");
      console.log(data);
    });
  });



});
