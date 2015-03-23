$(function()
{
    $('.settings-btn').on('tap', function(e)
    {
        $('.app-views').hide();
        $('.settings-view').show();

        $('.cache-time').val(window.localStorage.getItem("cache_time"));
    });

    $('.settings-view .back').on('tap', function(e)
    {
        $('.settings-view').hide();
        $('.app-views').show();
    });

    $('.settings-view .save').on('tap', function(e)
    {
        

        // save local settings..
        window.localStorage.setItem("cache_time", $('.cache-time').val());

        if(window.localStorage.getItem('cache_time') != null)
        {
            navigator.notification.vibrate(1000);

            $('.settings-view').hide();
            $('.app-views').show();
        }
    });
});