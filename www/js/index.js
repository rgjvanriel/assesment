$(function() {

    createVenuesListView($('.menu .active').data('view'));

    var cacheTime = window.localStorage.getItem('cache_time') || 86400;
    
    if(window.localStorage.getItem('lastcached') != null && Math.floor(new Date().getTime() / 1000 - cacheTime) > window.localStorage.getItem('lastcached'))
    {
        cacheVenues();
    }

});