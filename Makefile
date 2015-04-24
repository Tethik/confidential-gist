all: 
	cp bower_components/angular/angular.min.js lib/
	cp bower_components/sjcl/sjcl.js lib/

clean:
	rm dist/*

