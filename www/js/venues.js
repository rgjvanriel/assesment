/**
 * Venues
 */

var baseUrl = 'https://api.eet.nu/venues';
var maxDistance = 5000;
var isDebug = true;

var params = {
	'overview'	: '?1=1',
	'quality'	: '?sort_by=reviews',
	'distance'	: '?max_distance='+maxDistance+'&geolocation='+google.loader.ClientLocation.latitude+','+google.loader.ClientLocation.longitude
};

$.fn.renderView = function(html)
{
    $('.app-views .view').html('');
    $(this).html(html);
}

/**
 * List view
 */
function createVenuesListView(view)
{
	$.mobile.loading('show');
    retrieveVenuesList(view, function(data) {
        var view = getVenuesListView(data);
        $('.list-view').renderView(view);
        $.mobile.loading('hide');
    });
}

function retrieveVenuesList(view, callback, requestLive)
{
	if(typeof requestLive === 'undefined') requestLive = false;

	if(window.localStorage.getItem(view) != 'undefined' && window.localStorage.getItem(view) != null && requestLive == false)
	{
		callback(JSON.parse(window.localStorage.getItem(view)));
	}
	else
	{
		$.get(baseUrl+params[view], function(data) {
			callback(data['results']);
		});
	}
}

function getVenuesListView(data)
{
	var html = '';

	$.each(data, function(index, value) {
		html += '<li data-id="'+value.id+'">';
        if(value.images.cropped[0] != null)
        {
            html += '<img class="thumb" src="'+value.images.cropped[0]+'" alt="" title="">';
        }
        html += '<strong class="title">'+value.name+'</strong><span>Categorie: '+value.category+'</span></li>';
	});

	return html;
}

/**
 * Details view
 */
function retrieveVenueDetails(id, callback)
{
	$.get(baseUrl+"/"+id, function(data) {
		callback(data);
	});
}

function getVenueDetailsView(data)
{
	var html = '<h2>'+data.name+'</h2><span class="category">'+data.category+'</span><p class="description">'+data.description+'</p><ul class="contact"><li>Website: <a href="'+data.url+'">ga naar eet.nu</a></li><li >Telefoonnummer: <span class="call">'+data.telephone+'</span></li></ul>';

    html += '<ul class="images">';
    $.each(data.images.original, function(key,value) {
        html += '<li><img src="'+value+'" /></li>';
    });
    html += '</ul><span class="back">< Ga terug naar het overzicht</span>';

	return html;
}

/**
 * Venues list cache
 */
function cacheVenues()
{
	var currentTime = Math.floor(new Date().getTime() / 1000);
	window.localStorage.setItem('lastcached', currentTime);

	retrieveVenues('overview', function(data) {
		window.localStorage.setItem('overview', JSON.stringify(data));
	}, true);
	
	retrieveVenues('quality', function(data) {
		window.localStorage.setItem('quality', JSON.stringify(data));
	}, true);
};
