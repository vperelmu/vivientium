'use strict';

var Data = [{
	"id": "1",
	"title": "This is an issue",
	"tags": ["issue"],
	"comments": [],
	"text": "This is a description of the item, it might be a bug/task/comment, it can also display <a href='www.google.com'>Link</a>" 
}, {
	"id": "2",
	"title": "This is a bug",
	"tags": ["bug"],
	"comments": [],
	"text": "This is a description of the item, it might be a bug/task/comment, it can also display <a href='www.google.com'>Link</a>" 
}, {
	"id": "3",
	"title": "This is a pull request",
	"tags": ["bug"],
	"comments": [],
	"text": "This is a description of the item, it might be a bug/task/comment, it can also display <a href='www.google.com'>Link</a>" 
}, {
	"id": "4",
	"title": "This is a bug",
	"tags": ["etc"],
	"comments": [],
	"text": "This is a description of the item, it might be a bug/task/comment, it can also display <a href='www.google.com'>Link</a>" 
}];

var app = angular.module('dataService', []);

function setTags(tags, tagObj) {
	tags.forEach(function (tag) {
		tagObj[tag] = 1;
	});
}

app.service('dataService', function() {
	this.getAllData = function() {
		return Data;
	};

	this.getAllTags = function() {
		var AllTags = {};

		Data.forEach(function (item) {
			if (!item.tags) {
				return;
			}

			item.tags.forEach(function (tag) {
				AllTags[tag] = 1;
			});
		})

		return Object.keys(AllTags);
	};

	this.getDataById = function(id) {
		return Data.filter(function (item) {
			return item.id === id;
		})[0];
	};

	this.getDataByTag = function (tag) {
		return Data.filter(function(item) {
			return item.tags.indexOf(tag) !== -1;
		});
	};
})