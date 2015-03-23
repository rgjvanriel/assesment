$(function()
{

    $('.settings-btn').on('tap', function(e)
    {
        e.preventDefault();

        $('.settings-page').show();
        $('.default-page').hide();

        $('.cache-time').val(window.localStorage.getItem("cache_time", ""));
    });

    $('.settings-back-btn').on('tap', function(e)
    {
        e.preventDefault();

        $('.settings-page').hide();
        $('.default-page').show();
    });

    $('body').on('click', '.btn-save', function(e)
        {
            e.preventDefault();

            // save local settings..
            window.localStorage.setItem("cache_time", $('.cache-time').val());
        });
});