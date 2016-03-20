// IMPLEMENTATION OF NAMESPACE
(function(){
	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	}

	window.template = function(id){
		return _.template($('#' + id).html())
	}

	// Person Model
	App.Models.Person = Backbone.Model.extend({
		defaults: {
			name: 'Guest User',
			age: 30,
			occupation: 'worker'
		}
	})

	// List of people
	App.Collections.People = Backbone.Collection.extend({
		model : App.Models.Person
	})

	// View for all People
	App.Views.People = Backbone.View.extend({
		tagName: 'ul',

		initialize: function(){
			 // listeners/anouncers for the collection on add..
			this.collection.on('add', this.addOne, this)
		},

		// refactored render method...
		render: function(){
			this.collection.each(this.addOne, this)
			return this
		},

		// called from render method of collection view..
		addOne: function(person){
			var personView = new App.Views.Person({model:person})
			this.$el.append(personView.render().el)
		}
	})

	// the vie for a person
	App.Views.Person = Backbone.View.extend({
		tagName: 'li',

		template: template('personTemplate'),

		initialize: function(){
			this.model.on('change', this.render, this)
			this.model.on('destroy', this.remove, this) // 3. Adding a destroy announcer..
		},

		events: {
			'click .edit' : 'editPerson',
			'click .delete' : 'destroyPerson' /// 1. Binding a Destroy for the listing to click event on delete button..
		},

		destroyPerson: function(){
			// 2. calling backbone js destroy function to destroy that model object
			this.model.destroy();
		},

		remove: function(){
				this.$el.remove() // 4. Calling Jquery remove function to remove that HTML li tag element..
		},

		editPerson: function(){
			var newName = prompt("NAme", this.model.get('name'))
			if(!newName) return;
			this.model.set('name', newName)
		},

		render: function(){
			this.$el.html( this.template(this.model.toJSON()));
			return this;
		}
	});

	var peopleCollection = new App.Collections.People([
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

	App.Views.AddPerson = Backbone.View.extend({
		el : "#addPerson", // # referencing the form itself.

		events : {
			'submit': 'submit'
		},

		submit: function(e){
			e.preventDefault()
			var newPersonName = $(e.currentTarget).find('input[type=text]').val()
			var person = new App.Models.Person({ name: newPersonName})
			this.collection.add(person)
		}
	})

	var addPersonView = new App.Views.AddPerson({ collection: peopleCollection });
	peopleView = new App.Views.People({ collection: peopleCollection });
	$(document.body).append(peopleView.render().el);
})()
