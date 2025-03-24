document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Navbar & Dropdown Functionality
    $(document).ready(function () {
        $('.dropdown-toggle').dropdown();

        // Close dropdown when clicking outside
        $(document).click(function (event) {
            var clickover = $(event.target);
            var $navbar = $(".dropdown-menu");
            var _opened = $navbar.hasClass("show");
            if (_opened === true && !clickover.hasClass("dropdown-toggle")) {
                $navbar.removeClass("show");
            }
        });

        // Fix Navbar Toggler on Mobile
        $('.navbar-toggler').click(function () {
            var target = $(this).attr("data-target");
            $(target).collapse('toggle'); // Bootstrap toggle function
        });

        // Close navbar when clicking outside
        $(document).click(function (event) {
            var clickover = $(event.target);
            var $navbar = $(".navbar-collapse.show");
            var _opened = $navbar.length > 0;
            if (_opened === true && !clickover.closest(".navbar").length) {
                $navbar.collapse('hide');
            }
        });
    });

    // 🔹 Play & Close Trailer in Video Container
    document.querySelectorAll(".video-container").forEach(container => {
        let iframe = container.querySelector("iframe");
        let thumbnail = container.querySelector("img");
        let playButton = container.querySelector(".play-button");
        let overlayContent = container.querySelector(".overlay-content"); // Main text & buttons
        let featured = container.querySelector(".badge-trending"); // Trending badge

        // Create Close Button
        let closeButton = document.createElement("button");
        closeButton.innerText = "✖";
        closeButton.classList.add("close-iframe");
        closeButton.style.display = "none"; // Initially hidden
        container.appendChild(closeButton);

        function playTrailer() {
            if (!iframe) return;

            // Hide elements
            overlayContent.style.display = "none";
            featured.style.display = "none";
            thumbnail.style.display = "none";
            playButton.style.display = "none";
            iframe.style.display = "block";
            closeButton.style.display = "block"; // Show close button

            // Start Video
            let src = iframe.getAttribute("src");
            if (!src.includes("autoplay=1")) {
                iframe.setAttribute("src", src + "?autoplay=1");
            }
        }

        function closeTrailer() {
            if (!iframe) return;

            // Hide iframe & close button
            iframe.style.display = "none";
            closeButton.style.display = "none";

            // Show back thumbnail & play button
            thumbnail.style.display = "block";
            overlayContent.style.display = "block";
            featured.style.display = "block";
            playButton.style.display = "block";

            // Stop video by resetting iframe src
            iframe.setAttribute("src", iframe.getAttribute("src").split("?")[0]);
        }

        playButton.addEventListener("click", playTrailer);
        closeButton.addEventListener("click", closeTrailer);
    });

    // 🔹 Profile Picture & Name Change
    const profileOptions = document.querySelectorAll(".dropdown-item");
    const profilePic = document.getElementById("currentProfilePic");
    const profileName = document.getElementById("currentProfileName");

    profileOptions.forEach(option => {
        option.addEventListener("click", function () {
            let newImg = this.querySelector("img").src;
            let newName = this.querySelector("h5").textContent.trim();

            profilePic.src = newImg;
            profileName.textContent = newName;
        });
    });
});
