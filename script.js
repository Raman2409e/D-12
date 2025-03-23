$(document).ready(function () {
    $('.dropdown-toggle').dropdown();
});

$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var $navbar = $(".dropdown-menu");
        var _opened = $navbar.hasClass("show");
        if (_opened === true && !clickover.hasClass("dropdown-toggle")) {
            $navbar.removeClass("show");
        }
    });
});


$(document).ready(function () {
    // Ensure dropdowns work properly
    $('.dropdown-toggle').dropdown();

    // Fix Navbar Toggler on Mobile
    $('.navbar-toggler').click(function () {
        var target = $(this).attr("data-target");
        $(target).collapse('toggle'); // Proper Bootstrap toggle function
    });

    // Close navbar when clicking outside
    $(document).click(function (event) {
        var clickover = $(event.target);
        var $navbar = $(".navbar-collapse.show");
        var _opened = $navbar.length > 0;
        if (_opened === true && !clickover.closest(".navbar").length) {
            $navbar.collapse('hide'); // Properly close the navbar
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Function to handle play button click
    function playTrailer(event) {
        let parent = event.target.closest(".video-container");
        if (!parent) return;

        // Select elements
        let thumbnail = parent.querySelector("img");
        let iframe = parent.querySelector("iframe");
        let playButton = parent.querySelector(".play-button");
        let overlayContent = parent.querySelector(".overlay-content"); // Main text & buttons
        let featured = parent.querySelector(".badge-trending"); // Trending badge
        let suggestionText = parent.closest(".suggested-card")?.querySelector(".overlay"); // Suggestion card text

        // Hide elements
        if (featured) featured.style.display = "none";
        if (overlayContent) overlayContent.style.display = "none";
        if (suggestionText) suggestionText.style.display = "none";
        if (thumbnail) thumbnail.style.display = "none";
        if (playButton) playButton.style.display = "none";

        // Show iframe & autoplay video
        if (iframe) {
            iframe.style.display = "block";
            let src = iframe.getAttribute("src");
            iframe.setAttribute("src", src + "&autoplay=1");
        }
    }

    // Attach event listener to all play buttons
    document.querySelectorAll(".play-button").forEach((button) => {
        button.addEventListener("click", playTrailer);
    });
});
