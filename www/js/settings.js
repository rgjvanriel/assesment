$(function()
{
    $('.settings-btn').on('click', function(e)
    {
        $('.app-views').hide();
        $('.settings-view').show();

        $('.cache-time').val(window.localStorage.getItem("cache_time_setting"));
        $('.distance').val(window.localStorage.getItem("distance_setting"));
    });

    $('.settings-view .back').on('click', function(e)
    {
        $('.settings-view').hide();
        $('.app-views').show();
    });

    $('.settings-view .save').on('click', function(e)
    {
        // save local settings..
        window.localStorage.setItem("cache_time_setting", $('.cache-time').val());
        window.localStorage.setItem("distance_setting", $('.distance').val());

        //navigator.notification.vibrate(1000);

        $('.settings-view').hide();
        $('.app-views').show();
    });
});