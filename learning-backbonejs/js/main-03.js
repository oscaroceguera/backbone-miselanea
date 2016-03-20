// Person model
var Person = Backbone.Model.extend({
	defaults: {
		name: 'Guest user',
		age: 23,
		occupation: 'Worker'
	}
})

// A List of people
var PeopleCollection = Backbone.Collection.extend({
	model: Person
})

var peopleCollection = new PeopleCollection([
	{
		name: 'Mohit Jain',
		age: 26
	},
	{
		name: 'Taroon Tyagi',
		age: 25,
		occupation: 'web designer'
	},
	{
		name: 'Rahul Narang',
		age: 26,
		occupation: 'Java Developer'
	}
]);

// View for all people
var PeopleView = Backbone.View.extend({
	collection : peopleCollection,
	tagName: 'ul',
	render: function(){
		this.collection.each(function(person){
			var personView = new PersonView({ model: person})
			this.$el.append(personView.el)
		}, this)
		return this;
	}
})

// Teplate helpers
var template = function(id){
	return _.template($('#' + id).html());
}

// the vew for a person
var PersonView = Backbone.View.extend({
	tagName: 'li',

	clasName: 'person',

	id: 'person-id',

	//template: _.template( $('#personTemplate').html()),

	// Teplate helpers
	template : template('personTemplate'),

	initialize: function(){
		this.render()
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()))
	}
});



var peopleView = new PeopleView()
$(document.body).append(peopleView.render().el);
