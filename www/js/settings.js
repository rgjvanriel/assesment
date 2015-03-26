$(function()
{
    $('.settings-btn').on('tap', function(e)
    {
        $('.app-views').hide();
        $('.settings-view').show();

        $('.cache-time').val(window.localStorage.getItem("cache_time_setting"));
        $('.distance').val(window.localStorage.getItem("distance_setting"));

        return false;
    });

    $('.settings-view .back').on('tap', function(e)
    {
        $('.settings-view').hide();
        $('.app-views').show();

        return false;
    });

    $('.settings-view .save').on('tap', function(e)
    {
        // save local settings..
        window.localStorage.setItem("cache_time_setting", $('.cache-time').val());
        window.localStorage.setItem("distance_setting", $('.distance').val());

        navigator.notification.vibrate(1000);

        $('.settings-view').hide();
        $('.app-views').show();

        return false;
    });
});