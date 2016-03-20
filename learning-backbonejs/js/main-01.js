var Person = Backbone.Model.extend({
	defaults: {
		name: 'Guest user',
		age: 23,
		occupation: 'Worker'
	},

	validate: function(attributes){
		if( attributes.age < 0 ) { return 'Age must be positive'}
		if( !attributes.name ) { return 'Every person must have a name'}
	},

	work: function(){
		return this.get('name') + 'is working'
	}
})

var person = new Person;

console.log('Person Model',person);

// 1. We have access to attributes,
// 2. We have access to functins,
// 3. We have access to changed object, which helps us to check if object has been changed or not.
// 4. If something has been changed then backbone will announce that thing and
// 5. we can hook into that to update DOM or do other cool things.

// >>> GETTERS
console.log('\n');
console.log('--- GETTERS (we do that by using get method) ---');
console.log(person.get('name'));
console.log(person.get('age'));
console.log(person.get('occupation'));

// ? You can't do things like :
	//person.name // THATS invalid..
	//person.age  // THATS invalid..

// >>> SETTERS
console.log('\n');
console.log('--- SETTERS (for update) ---');
person.set('name', 'Tarron Tyagi');
console.log(person.get('name'));
person.set('age', 26);
console.log(person.get('age'));
person.set('occupation', 'Graphics Designer');
console.log(person.get('occupation'));
// console.log('Or you can update the values in just on go ie');
// console.log(person.set({name:"Taroon Tyagi", age: 26, occupation: "Graphics Designer"}));

// >>> SET VALUES WHILE INITIATING OBJECT
console.log('\n');
var person = new Person({name:"Oscar", age: 30, occupation: "Graphics Designer"})

// >>> JSON OUTPUT
	// this will return all the attributes of that object.
	// It will not return a Json be returns what we need
console.log('JSON OUTPUT');
console.log(person.toJSON());

// >>> VALIDATE
console.log('\n');
console.log('VALIDATE');
var person = new Person({name: 'Juan Francisto', age: -1, occupation: 'Mariguano'})
console.log(person.get('age'));
var person = new Person;
console.log(person.get('age'));
person.set('age',-1)
console.log(person.get('age'));

person.on('error', function(model, error){
	console.log(error);
})
person.set('age',-1)
