// >>> EXPALIN VIEWS
var Person = Backbone.Model.extend({
	defaults: {
		name: 'Guest user',
		age: 23,
		occupation: 'Worker'
	}
})

var person = new Person;

var PersonView = Backbone.View.extend({
	model: person,
	tagName: 'li',
	clasName: 'person',
	id: 'person-id',
	initialize: function(){
		this.render()
	},
	render: function(){
		this.$el.html(this.model.get('name') + ' ' + this.model.get('age') + ' ' + this.model.get('occupation'))
	}
});

var personView = new PersonView()
//will tell you the view for the object. Right now its a blank "li" tag.
console.log(personView.el);
// is jquery tied up view for this object.
console.log(personView.$el);

// this is not ideal but good enough for demo.
$(document.body).html(personView.el)
