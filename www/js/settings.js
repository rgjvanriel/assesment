$(function()
{

    $('.settings-btn').on('tap', function(e)
    {
        e.preventDefault();

        var source = $("#" + $(this).data('template-id')).html();
        var template = Handlebars.compile(source);
        $('#content').html(template(
            {
                settings: [
                    {
                        name: "cache_time",
                        niceName: "Cache time"
                    }
                ]
            }));
    });

    $('body').on('click', '.btn-save', function(e)
        {
            e.preventDefault();

            // save local settings..
            // 
        });
});