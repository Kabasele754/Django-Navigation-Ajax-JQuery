$(document).ready(function() {
    function setActiveLink(url) {
        $('.nav-link').removeClass('active');
        $('.nav-link[href="' + url + '"]').addClass('active');
    }

    $('.ajax-link').on('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior

        var url = $(this).attr('href');
        var target = $(this).data('target');

        console.log('Clicked link, loading URL:', url);

        $.ajax({
            url: url,
            success: function(data) {
                console.log('Content loaded successfully');
                $(target).html($(data).find(target).html());
                // Update the browser's history
                window.history.pushState({ path: url }, '', url);
                // Set the active link
                setActiveLink(url);
            },
            error: function(xhr, status, error) {
                console.log('Error loading content:', error);
            }
        });
    });

    // Handle the back and forward buttons
    window.onpopstate = function(event) {
        if (event.state) {
            var url = event.state.path;
            console.log('Handling popstate, loading URL:', url);
            $.ajax({
                url: url,
                success: function(data) {
                    $('#content').html($(data).find('#content').html());
                    // Set the active link
                    setActiveLink(url);
                },
                error: function(xhr, status, error) {
                    console.log('Error loading content on popstate:', error);
                }
            });
        }
    };

    // Initialize the active link based on the current URL
    setActiveLink(window.location.pathname);
});
