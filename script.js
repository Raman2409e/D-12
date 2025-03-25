document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Navbar & Dropdown Functionality
    $(document).ready(function () {
        $('.dropdown-toggle').dropdown();
        $(document).click(function (event) {
            var clickover = $(event.target);
            var $navbar = $(".dropdown-menu");
            var _opened = $navbar.hasClass("show");
            if (_opened && !clickover.hasClass("dropdown-toggle")) {
                $navbar.removeClass("show");
            }
            var $navCollapse = $(".navbar-collapse.show");
            if ($navCollapse.length > 0 && !clickover.closest(".navbar").length) {
                $navCollapse.collapse('hide');
            }
        });
        $('.navbar-toggler').click(function () {
            var target = $(this).attr("data-target");
            $(target).collapse('toggle');
        });
    });

    // 🔹 Global Elements
    let searchInput = document.getElementById("searchInput");
    let resultsContainer = document.getElementById("searchResults");
    let watchingList = document.querySelector(".watching-list");
    let videoContainers = [];

    // 🔹 Collect All Video Containers
    document.querySelectorAll(".video-container").forEach(container => {
        let titleElement = container.querySelector("h4, h5, .overlay h4, .overlay h5");
        let iframe = container.querySelector("iframe");
        let thumbnail = container.querySelector("img");
        let playButton = container.querySelector(".play-button");
        let overlay = container.querySelector(".overlay");

        if (titleElement && iframe && thumbnail && playButton && overlay) {
            let animeData = {
                title: titleElement.innerText.trim().toLowerCase(),
                container: container,
                iframe: iframe,
                thumbnail: thumbnail,
                playButton: playButton,
                overlay: overlay,
                originalSrc: iframe.src,
                imageSrc: thumbnail.src
            };

            videoContainers.push(animeData);
            playButton.addEventListener("click", () => playAnime(animeData));
        }
    });

    // 🔹 Search Functionality
    searchInput.addEventListener("input", function () {
        let query = this.value.trim().toLowerCase();
        resultsContainer.innerHTML = "";

        if (query.length > 2) {
            let filteredResults = videoContainers.filter(anime => anime.title.includes(query));

            if (filteredResults.length === 0) {
                resultsContainer.classList.remove("show");
            } else {
                resultsContainer.classList.add("show");
                filteredResults.forEach(anime => {
                    let resultItem = document.createElement("div");
                    resultItem.classList.add("search-result-item");
                    resultItem.innerHTML = `<p>${anime.title}</p>`;
                    resultItem.addEventListener("click", function () {
                        playAnime(anime);
                        resultsContainer.classList.remove("show");
                    });
                    resultsContainer.appendChild(resultItem);
                });
            }
        } else {
            resultsContainer.classList.remove("show");
        }
    });

    document.addEventListener("click", function (event) {
        if (!searchInput.contains(event.target) && !resultsContainer.contains(event.target)) {
            resultsContainer.classList.remove("show");
        }
    });

    // 🔹 Play & Close Trailer in Video Container
    function playAnime(anime) {
        console.log("🎬 Playing:", anime.title);

        anime.thumbnail.style.display = "none";
        anime.playButton.style.display = "none";
        anime.overlay.style.opacity = "0";

        anime.iframe.src = anime.originalSrc + "?autoplay=1";
        anime.iframe.style.display = "block";

        let closeButton = anime.container.querySelector(".close-iframe");
        if (!closeButton) {
            closeButton = document.createElement("button");
            closeButton.innerText = "✖";
            closeButton.classList.add("close-iframe");
            anime.container.appendChild(closeButton);
            closeButton.addEventListener("click", function () {
                closeAnime(anime, closeButton);
            });
        }
        closeButton.style.display = "block";

        addToContinueWatching(anime);
    }

    function closeAnime(anime, closeButton) {
        anime.iframe.src = "";
        setTimeout(() => {
            anime.iframe.src = anime.originalSrc;
        }, 100);

        anime.iframe.style.display = "none";
        closeButton.style.display = "none";
        anime.thumbnail.style.display = "block";
        anime.playButton.style.display = "block";
        anime.overlay.style.opacity = "1";
    }

    function addToContinueWatching(anime) {
        let existingItem = [...watchingList.children].find(item =>
            item.querySelector("h5").innerText.toLowerCase() === anime.title
        );

        if (existingItem) {
            watchingList.prepend(existingItem);
        } else {
            let newItem = createCustomCard(anime);
            watchingList.prepend(newItem);

            if (watchingList.children.length > 3) {
                watchingList.removeChild(watchingList.lastElementChild);
            }
        }
    }

    // 🔹 Custom Card Component
    function createCustomCard(anime) {
        let newItem = document.createElement("div");
        newItem.classList.add("custom-card", "watching-item", "mb-1");
        newItem.innerHTML = `
            <img src="${anime.imageSrc}" class="img-fluid rounded" alt="${anime.title}">
            <div class="watching-info">
                <h5>${anime.title}</h5>
                <a href="#" class="play-buttons"><i class="bi bi-play-fill"></i></a>
            </div>
        `;

        newItem.querySelector(".play-buttons").addEventListener("click", function () {
            playAnime(anime);
        });

        return newItem;
    }

    // 🔹 Apply Custom Card Play Button Logic
    document.querySelectorAll(".custom-card .play-buttons").forEach(button => {
        button.addEventListener("click", function () {
            let cardTitle = this.closest(".custom-card").querySelector("h4, h5").innerText.trim().toLowerCase();
            let matchedAnime = videoContainers.find(a => a.title.toLowerCase() === cardTitle);

            if (matchedAnime) {
                playAnime(matchedAnime);
                addToContinueWatching(matchedAnime);
            } else {
                console.log("❌ No matching anime found for", cardTitle);
            }
        });
    });

    // 🔹 Profile Picture & Name Change
    const profileOptions = document.querySelectorAll(".dropdown-item");
    const profilePic = document.getElementById("currentProfilePic");
    const profileName = document.getElementById("currentProfileName");

    profileOptions.forEach(option => {
        option.addEventListener("click", function () {
            profilePic.src = this.querySelector("img").src;
            profileName.textContent = this.querySelector("h5").textContent.trim();
        });
    });
});
