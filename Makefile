all:
	cp bower_components/angular/angular.min.js lib/
	cp bower_components/sjcl/sjcl.js lib/
	cp bower_components/octicons/octicons/octicons.css lib/

clean:
	rm dist/*
