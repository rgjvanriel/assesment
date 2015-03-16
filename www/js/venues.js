/**
 * Venues
 */

var baseUrl = 'https://api.eet.nu/venues';
var isDebug = true;

function retrieveVenues(params, callback)
{
	var results;

	if(typeof params == 'undefined') params = '';
	else if(isDebug && params === '') { params = '?1=1'; }
	
	$.get(baseUrl+params, function(data) {
		callback(data);
	});
}

function getVenuesView(data)
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

function cacheVenues()
{
	var currentTime = Math.floor(new Date().getTime() / 1000);
	window.localStorage.setItem('lastcached', currentTime);

	retrieveVenues("", function(data) {
		console.log(JSON.stringify(data.result));
		window.localStorage.setItem('overview', JSON.stringify(data.result));
	});
	
	retrieveVenues("?sort_by=reviews", function(data) {
		window.localStorage.setItem('quality', JSON.stringify(data.result));
	});

	lat = google.loader.ClientLocation.latitude;
    lng = google.loader.ClientLocation.longitude;

	retrieveVenues('?max_distance=5000&geolocation='+lat+','+lng, function(data) {

		window.localStorage.setItem('distanc', JSON.stringify(data.result));
	});
};
