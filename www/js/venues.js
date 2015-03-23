/**
 * Venues
 */

var baseUrl = 'https://api.eet.nu/venues';
var maxDistance = 5000;
var isDebug = true;
var lat = 0;
var lng = 0;

var params = {
	'overview'	: '?1=1',
	'quality'	: '?sort_by=reviews',
	'distance'	: '?max_distance='+maxDistance+'&geolocation='+lat+','+lng,
	'search'	: '?query='
};

$.fn.renderListView = function(html)
{
    $('.app-views .details-view').hide();
    $('.app-views .list-view').show();
    $(this).html(html);
}

$.fn.renderDetailsView = function(html)
{
    $('.app-views .list-view').hide();
    $('.app-views .details-view').show();
    $(this).html(html);
}

/**
 * Search
 */
function createSearchVenuesListView(view, query)
{
	$.mobile.loading('show');
    retrieveVenuesList(view, function(data) {
        var view = getVenuesListView(data);
        $('.list-view').renderListView(view);
        $.mobile.loading('hide');
    }, true, query);
}

/**
 * List view
 */
function createVenuesListView(view)
{
	$.mobile.loading('show');
    retrieveVenuesList(view, function(data) {
        var view = getVenuesListView(data);
        $('.list-view').renderListView(view);
        $.mobile.loading('hide');
    });
}

function retrieveVenuesList(view, callback, requestLive, query)
{
	if(typeof requestLive === 'undefined') requestLive = false;

	if(window.localStorage.getItem(view) != 'undefined' && window.localStorage.getItem(view) != null && requestLive == false)
	{
		callback(JSON.parse(window.localStorage.getItem(view)));
	}
	else
	{
		if(typeof query === 'undefined') query = '';

		if(view == 'distance')
		{
			function onSuccess(position) {
				lat = position.coords.latitude;
				lng = position.coords.longitude;
			};

			function onError(error) {
			    alert('Kon de geolocaties niet ophalen, kijk of u geolocaties aan heeft staan.');
			}

			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}

		$.get(baseUrl+params[view]+query, function(data) {
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
	if(data.description == null) data.description = '';

	var html = '<h2>'+data.name+'</h2><span class="category">'+data.category+'</span><p class="description">'+data.description+'</p><ul class="contact"><li>Website: <a href="'+data.url+'">ga naar eet.nu</a></li><li >Telefoonnummer: <span class="call">'+data.telephone+'</span></li></ul>';

    html += '<ul class="images">';
    $.each(data.images.original, function(key,value) {
        html += '<li><img src="'+value+'" /></li>';
    });
    html += '</ul><span class="back">< Terug</span>';

	return html;
}

/**
 * Venues list cache
 */
function cacheVenues()
{
	var currentTime = Math.floor(new Date().getTime() / 1000);
	window.localStorage.setItem('lastcached', currentTime);

	retrieveVenuesList('overview', function(data) {
		window.localStorage.setItem('overview', JSON.stringify(data));
	}, true);
	
	retrieveVenuesList('quality', function(data) {
		window.localStorage.setItem('quality', JSON.stringify(data));
	}, true);
};