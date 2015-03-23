$(function() {

    createVenuesListView($('.menu .active').data('view'));

    if(window.localStorage.getItem('lastcached') != null && Math.floor(new Date().getTime() / 1000 - 86400) > window.localStorage.getItem('lastcached'))
    {
        cacheVenues();
    }

});