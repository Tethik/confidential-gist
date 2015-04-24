all:
	cp bower_components/angular/angular.min.js lib/
	cp bower_components/sjcl/sjcl.js lib/
	cp bower_components/octicons/octicons/octicons.css lib/
	cp bower_components/octicons/octicons/octicons.woff lib/
	cp bower_components/octicons/octicons/octicons.ttf lib/

clean:
	rm dist/*
