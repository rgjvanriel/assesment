$(function() {

    Overview();

    $(document).on('tap', '.menu li', function(e) {
        $this = $(e.currentTarget);

        showView($this.data('view'));

        $('.menu li').removeClass('active');
        $this.addClass('active');
    });

    $(document).on('swipe', function() {
        $active = $('.menu .active');
        $next = $active.next();

        if($next != null)
        {
            showView($next.data('view'));
        }

        $('.menu li').removeClass('active');
        $next.addClass('active');
    });

    var searchTimeout;

    $('.search input').on('tap', function() {
        $this = $(this);
        searchTimeout = setTimeout(function() {
            search($this.val());
        }, 2000);
    });

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
        ClearListView();
        ShowLoading();

        $.get( "https://api.eet.nu/venues?query="+query, function( data ) {
            var result = data['results'];

            $.each(result, function(key, value) {
                var html = "<li><a href='"+value.url+"'>";
                if(value.images.cropped[0] != null)
                {
                    html += "<img class='thumb' src='"+value.images.cropped[0]+"' alt='' title=''>";
                }
                html += "<strong class='title'>"+value.name+"</strong><span>Categorie: "+value.category+"</span></a></li>";

                AppendToListView(html);
            });
        }).done(function() {
            HideLoading();
        });
    }

    function Overview()
    {
        ClearListView();
        ShowLoading();

        $.get( "https://api.eet.nu/venues", function( data ) {
            renderListView(data['results']);
        }).done(function() {
            HideLoading();
        });
    }

    function PriceQuality()
    {
        ClearListView();
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

        ClearListView();
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

    function ClearListView()
    {
        $('#content .list-view').empty();
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
    }

    /**
     * Retrieve venue information
     */
    $(document).on('tap', '.list-view li', function(e) {
        $this = $(e.currentTarget);

        retrieveVenueData($this.data('id'));
    });

    function retrieveVenueData(id)
    {
        if(id == null)
        {
            return false
        }

        ClearListView();
        ShowLoading();

        $.get('https://api.eet.nu/venues/'+id, function(data) {
            renderDetailView(data);
        }).done(function() {
            HideLoading();
        });
    }

    function renderDetailView(data)
    {
        console.log(data);
        var html = '<h2>'+data.name+'</h2><span class="category">'+data.category+'</span><p class="description">'+data.description+'</p><ul class="contact"><li>Website: <a href="'+data.url+'">ga naar eet.nu</a></li><li >Telefoonnummer: <span class="call">'+data.telephone+'</span></li></ul>';

        html += '<ul class="images">';
        $.each(data.images.cropped, function(key,value) {
            html += '<li><img src="'+value+'" /></li>';
        });
        html += '</ul>';

        $('.details-view').append(html);
    }


    /**
     * Call number via native
     */
    $(document).on('tap', '.call', function(e) {
        $this = $(e.currentTarget);

        call($this.html());
    });

    function call(number)
    {
        window.open('tel:'+number, '_system');
    }

});