var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1,250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({force: true}).then(function() {
	console.log('Everything is synced');

	Todo.create({
		description: 'Walking dog',
		completed: true
	}).then(function(todo) {
		return Todo.create({
			description: 'Clean office'
		}).then(function() {
			//return Todo.findById(1)
			return Todo.findAll({
				where: {
					description: {
						$like: '%dog%'
					},
					completed: true
				}
			});
		}).then(function (todo){
			if (todo) {
				todo.forEach(function(record) {
				console.log(record.toJSON());
				})
				
			} else {
				console.log('no todo found');
			}
	}).catch(function(e) {
		console.log(e);
	});

});

});


