$(function() {

	$(document).on('tap', '.menu li', function(e) {
        $this = $(e.currentTarget);
        createVenuesListView($this.data('view'));

        $('.menu li').removeClass('active');
        $this.addClass('active');
    });

    $(document).on('tap', '.list-view li', function(e) {
        $this = $(e.currentTarget);

        $.mobile.loading('show');
        retrieveVenueDetails($this.data('id'), function(data) {
            var view = getVenueDetailsView(data);
            $('.details-view').renderDetailsView(view);
            $.mobile.loading('hide');
        });
    });

    $(document).on('tap', '.details-view .back', function(e) {
        $('.app-views .details-view').hide();
        $('.app-views .list-view').show();
    });


	/**
	 * Swipe events
	 */
    $('.list-view').on('swipeleft', function() {
        $active = $('.menu .active');
        $next = $active.next();

        if($next.length > 0)
        {
            createVenuesListView($next.data('view'));

            $('.menu li').removeClass('active');
            $next.addClass('active');
        }
    });

    $('.list-view').on('swiperight', function() {
        $active = $('.menu .active');
        $prev = $active.prev();

        if($prev.length > 0)
        {
            createVenuesListView($prev.data('view'));

            $('.menu li').removeClass('active');
            $prev.addClass('active');
        }
    });

    $(".details-view").on('swiperight', function() {
        createVenuesListView($('.menu .active').data('view'));
    });


    /**
     * Search
     */
    var searchTimeout;

    $('.search input').on('keyup', function() {
        $this = $(this);
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function() {
            createSearchVenuesListView('search', $this.val());
        }, 2000);
    });

    /**
     * Call number via native
     */
    $(document).on('tap', '.call', function(e) {
        $this = $(e.currentTarget);

        window.open('tel:'+$this.html(), '_system');
    });

});