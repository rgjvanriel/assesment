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

function retrieveVenues(view, callback, requestLive)
{
	if(typeof requestLive === 'undefined') requestLive = false;

	if(window.localStorage.getItem(view) != 'undefined' && window.localStorage.getItem(view) != null && requestLive == false)
	{
		console.log('cache call');
		callback(JSON.parse(window.localStorage.getItem(view)));
	}
	else
	{
		console.log('live call');
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

function getVenuesDetailView(data)
{
	var html = '<h2>'+data.name+'</h2><span class="category">'+data.category+'</span><p class="description">'+data.description+'</p><ul class="contact"><li>Website: <a href="'+data.url+'">ga naar eet.nu</a></li><li >Telefoonnummer: <span class="call">'+data.telephone+'</span></li></ul>';

    html += '<ul class="images">';
    $.each(data.images.cropped, function(key,value) {
        html += '<li><img src="'+value+'" /></li>';
    });
    html += '</ul>';

	return html;
}

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
