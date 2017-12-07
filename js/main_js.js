// a default type
var type = 'table';

// example json string
var json_string = retrieve_json();

// get received JSON and parse into a javascript object
var items = JSON.parse(json_string);

// page load function
$(document).ready(function(){

	// Spawn dropdown contents for mode select
	$('#mode_select').append("<option value='2'>Table</option><option value='3'>Grid</option>");

	// Spawn dropdown contents for criteria select
	$('#criteria_select').append("<option value='title'>Title</option><option value='desc'>Description</option><option value='price'>Price</option>");

	enable_table();
}); // end of document ready

$('#suggest').on("change keyup paste",function () {
	var search = $('#suggest').val();
	var result = suggest(items, search);
	generate_list(result, type);
});

$('#mode_select').on("change", function() {
	switch($('#mode_select').val())
	{
		case '2':
			enable_table();
			break;

		case '3':
			enable_grid();
			break;

		default:
			enable_table();
			break;
	} // end of switch
});

// function to get json needed to make list of products
// JSON may be retrieved from json file or supplied from an API or the backend funtions in the same web applications
function retrieve_json()
{
	return '[{"product_id" : 1,"product_name" : "Handbag","product_category" : "luxury","product_description" : "Self-inserted description","product_price" : 21.01},{"product_id" : 2,"product_name" : "toilet paper","product_category" : "necessity", "product_description" : "Self-inserted description", "product_price" : 222.01}, {"product_id" : 3,"product_name" : "Laptop","product_category" : "luxury","product_description" : "Self-inserted description","product_price" : 1999.99}]';
} // end of retrieve_json

function generate_list(list_items, in_type)
{
	type = in_type;
	var list_item = '';

	switch(type)
	{
		case 'table':
			$('#suggest_table > tbody').empty();
			$.each(list_items, function(item, value) {
				list_item += '<tr>';
				list_item += '<td><img class="group list-group-image" src="http://placehold.it/200x150/000/fff" alt="" /></td>';
				list_item += '<td>' + value.product_name + '</td>';
				list_item += '<td>' + value.product_description + '</td>';
				list_item += '<td>$' + value.product_price + '</td>';
				list_item += '</tr>';
			});

			$('#suggest_table > tbody').append(list_item);
			break;

		case 'grid':
			$('#suggest_grid').empty();
			$.each(list_items, function(item, value) {
				list_item += '<div class="item  col-xs-4 col-lg-4"><div class="thumbnail"><img class="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" /><div class="caption"><h4 class="group inner list-group-item-heading">' + value.product_name + '</h4><p class="group inner list-group-item-text">' + value.product_description + '</p><div class="row"><div class="col-xs-12 col-md-6"><p class="lead">' + value.product_price + '</p></div><div class="col-xs-12 col-md-6"><a class="btn btn-success" href="http://www.jquery2dotnet.com">Add to cart</a></div></div></div></div></div>';
			});

			$('#suggest_grid').append(list_item);
			break;

		default:
			$('#suggest_table > tbody').empty();
			$.each(list_items, function(item, value) {
				list_item += '<tr>';
				list_item += '<td><img class="group list-group-image" src="http://placehold.it/200x150/000/fff" alt="" /></td>';
				list_item += '<td>' + value.product_name + '</td>';
				list_item += '<td>' + value.product_description + '</td>';
				list_item += '<td>$' + value.product_price + '</td>';
				list_item += '</tr>';
			});

			$('#suggest_table > tbody').append(list_item);
			break;
	}
} // end of generate_list

// auto suggest function
function suggest(items, search)
{
	var result = '';

	switch($('#criteria_select').val())
	{
		case 'title':
			result = jQuery.grep(items, function(item) {
				return(item.product_name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
			});

			break;

		case 'desc':
			result = jQuery.grep(items, function(item) {
				return(item.product_description.toLowerCase().indexOf(search.toLowerCase()) >= 0);
			});
			break;

		case 'price':
			result = jQuery.grep(items, function(item) {
				return(item.product_price.toString().indexOf(search.toLowerCase()) >= 0);
			});
			break;

		default:
			result = jQuery.grep(items, function(item) {
				return(item.product_name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
			});
			break;
	}

	return result;
} // end of suggest function

// switch to table mode
function enable_table()
{
	$('.table_mode').show();
	$('.list_mode').hide();
	$('.grid_mode').hide();
	generate_list(items, 'table');
} // end of enable_table

// switch to grid mode
function enable_grid()
{
	$('.grid_mode').show();
	$('.table_mode').hide();
	$('.list_mode').hide();
	generate_list(items, 'grid');
}; // end of enable_grid