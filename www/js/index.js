$(function() {

    Overview();

    $(".menu li").on("click", function() {
        $this = $(this);

        switch($this.data("view")) {
            case "overview": 
                Overview();
                break;
            case "price-quality": 
                PriceQuality();
                break;
            case "distance": 
                Distance();
                break;
        }
    });

    var searchTimeout;

    $('.search input').on('keyup', function() {
        $this = $(this);
        searchTimeout = setTimeout(function() {
            search($this.val());
        }, 2000);
    });

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
            HideLoading()
        });
    }

    function Overview()
    {
        ClearListView();
        ShowLoading();

        $.get( "https://api.eet.nu/venues", function( data ) {
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
            HideLoading()
        });
    }

    function PriceQuality()
    {
        ClearListView();
        ShowLoading();

        $.get( "https://api.eet.nu/venues?sort_by=reviews", function( data ) {
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
            HideLoading()
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

});