
// Backbone Model

var Blog = Backbone.Model.extend({    		// this is the object's structure
	defaults: {								// default properties of said object
		author: '',							// these are arbitaraily assigned (I can assign these)
		title: '',
		url: ''
	}
});

// Backbone Collection

var Blogs = Backbone.Collection.extend({});

// instantiate two Blogs

var blog1 = new Blog({
	author: 'Michael',
	title: 'Michael\'s Blog',
	url: 'http://michaelsblog.com'
});
var blog2 = new Blog({
	author: 'John',
	title: 'John\'s Blog',
	url: 'http://johnsblog.com'
});

// instantiate a Collection

var blogs = new Blogs();

// Backbone View for one blog

var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
	},
	events: {
		'click .edit-blog': 'edit',					//whenever any of these events are triggered, the following code is executed
		'click .update-blog': 'update',			
		'click .cancel': 'cancel',
		'click .delete-blog': 'delete'
	},
	edit: function() {								//the following is executed when one click's edit blog 
		$('.edit-blog').hide();					
		$('.delete-blog').hide();			
		this.$('.update-blog').show();				//in this case the list of blogs becomes editable
		this.$('.cancel').show();

		var author = this.$('.author').html();		//the code for the row we want to edit (currently uneditable)
		var title = this.$('.title').html();
		var url = this.$('.url').html();

		this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');	//by wrapping the variables in an input tag, they become textboxes with the previous information
		this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
		this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">');
	},
	update: function() {										//the following is executed when one click's edit blog 
		this.model.set('author', $('.author-update').val()); 	//these lines essentially take the user input and stores the values inside the model	
		this.model.set('title', $('.title-update').val());		//this is where the change in data occurs
		this.model.set('url', $('.url-update').val());
	},
	cancel: function() {		
		blogsView.render();								
	},
	delete: function() {
		this.model.destroy();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		//inside of this tr, we are going to insert html, 	
		return this;
	}
});

// Backbone View for all blogs

var BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function() { 
		var self = this;
		this.model.on('add', this.render, this); //everytime you add a blog, render it
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);
	},
	render: function() {
		var self = this; //pass in this useing self
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {   
			self.$el.append((new BlogView({model: blog})).render().$el); 
			//for every blog, append a new table row, give it the model blog and render it
		});
		return this;
	}
});

var blogsView = new BlogsView();

$(document).ready(function() {
	$('.add-blog').on('click', function() {
		var blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val()
		});
		$('.author-input').val('');
		$('.title-input').val('');
		$('.url-input').val('');
		console.log(blog.toJSON());
		blogs.add(blog);
	})
})