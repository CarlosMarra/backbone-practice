//Backbone Model for tiles

var tile = Backbone.Model.extend({
	defaults: {
		number: 0,					//the number involves determining the color and property of the tiles
		xcoord: 0,
		ycoord: 0,
		id: 0
	}
});

//Instantiating tiles for grid

var i;
var j;
var k;
var count = 0;
var coordinate_array = [16];
    
for(j = 0; j < 4; j++){
		
	for(k = 0; k < 4; k++){
		
		var random = Math.floor(Math.random() * 3) + 1;
		coordinate_array[count++] = new tile({
			number: random,
			xcoord: j,
			ycoord: k,
			id: count
		})
	}
}


// Backbone Collections
var Tiles = Backbone.Collection.extend({
	model: tile
});


// instantiate a Collection
var tiles = new Tiles(coordinate_array);



//the view for a single model view
var tileview = Backbone.View.extend({

	tagName: 'article',
	className: "lone_tile", //class name for tagName to apply css
	template: _.template($('#grid_making').html()),

	attributes: function() {
		var numbers = this.model.get('number');
	},

	render: function() {
		var tile_formation = this.template(this.model.toJSON());
		this.$el.html(tile_formation);
		return this;
	}

});

//the view for a collection view
var gridview = Backbone.View.extend({

	tagName: 'section',
	
	render: function() {
		this.collection.each(this.addTile, this);
		return this;
	},

	addTile: function(tile) {
		var singleTile = new tileview ({ model: tile });
		this.$el.append(singleTile.render().el);
	}

});


var layout = new gridview({ collection: tiles});

$(".simple").html(layout.render().el);




$(document).ready(function() {
	$('.id_1').on('click', function() {

	});
});

