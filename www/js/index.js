$(function() {

    // Cache check
    if(window.localStorage.getItem('lastcached') != null)
    {
        //console.log(window.localStorage.getItem('overview'));
        var view = getVenuesView(window.localStorage.getItem('overview'));
    }
    else
    {
        retrieveVenues('', function(data) {
            var view = getVenuesView(data.results);
            renderView(view);
        });
    }

    function renderView(html)
    {
        $('.view').html(html);
    }

    cacheVenues();

    if(window.localStorage.getItem('lastcached') != null && Math.floor(new Date().getTime() / 1000 - 30) > window.localStorage.getItem('lastcached'))
    {
        cacheVenues();
    }

    /*Overview();

    function showView(view)
    {
        switch(view) {
            case 'overview': 
                Overview();
                break;
            case 'price-quality': 
                PriceQuality();
                break;
            case 'distance': 
                Distance();
                break;
        }
    }

    function search(query)
    {
        ClearView();
        ShowLoading();

        $.get( "https://api.eet.nu/venues?query="+query, function( data ) {
            renderListView(data['results']);
        }).done(function() {
            HideLoading();
        });
    }

    function Overview()
    {
        ClearView();
        ShowLoading();

        $.get( "https://api.eet.nu/venues", function( data ) {
            renderListView(data['results']);
        }).done(function() {
            HideLoading();
        });
    }

    function PriceQuality()
    {
        ClearView();
        ShowLoading();

        $.get( "https://api.eet.nu/venues?sort_by=reviews", function( data ) {
            renderListView(data['results']);
        }).done(function() {
            HideLoading()
        });
    }

    function Distance()
    {
        lat = google.loader.ClientLocation.latitude;
        lng = google.loader.ClientLocation.longitude;

        ClearView();
        ShowLoading();

        $.get( "https://api.eet.nu/venues?max_distance=5000&geolocation="+lat+","+lng, function( data ) {
            renderListView(data['results']);
        }).done(function() {
            HideLoading();
        });
    }

    function renderListView(data)
    {
        $.each(data, function(key, value) {
            var html = "<li data-id='"+value.id+"'>";
            if(value.images.cropped[0] != null)
            {
                html += "<img class='thumb' src='"+value.images.cropped[0]+"' alt='' title=''>";
            }
            html += "<strong class='title'>"+value.name+"</strong><span>Categorie: "+value.category+"</span></li>";

            AppendToListView(html);
        });
    }

    function ClearView()
    {
        $('#content .list-view').empty();
        $('#content .details-view').empty();
    }

    function AppendToListView(data)
    {
        $('#content .list-view').append(data);
    }

    function ShowLoading()
    {
        $.mobile.loading('show', {
            defaults: true
        });
    }

    function HideLoading()
    {
        $.mobile.loading('hide');
    }*/

    /**
     * Retrieve venue information
     */
    /*$(document).on('tap', '.list-view li', function(e) {
        $this = $(e.currentTarget);

        retrieveVenueData($this.data('id'));
    });

    function retrieveVenueData(id)
    {
        if(id == null)
        {
            return false
        }

        ClearView();
        ShowLoading();

        $.get('https://api.eet.nu/venues/'+id, function(data) {
            renderDetailView(data);
        }).done(function() {
            HideLoading();
        });
    }

    function renderDetailView(data)
    {
        var html = '<h2>'+data.name+'</h2><span class="category">'+data.category+'</span><p class="description">'+data.description+'</p><ul class="contact"><li>Website: <a href="'+data.url+'">ga naar eet.nu</a></li><li >Telefoonnummer: <span class="call">'+data.telephone+'</span></li></ul>';

        html += '<ul class="images">';
        $.each(data.images.cropped, function(key,value) {
            html += '<li><img src="'+value+'" /></li>';
        });
        html += '</ul>';

        $('.details-view').append(html);
    }*/

});