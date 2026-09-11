// Mobile-Slideshow: macht jedes .m-car (Wrapper um eine .car-track Grid-Liste)
// auf Mobile zu einem Scroll-Snap-Karussell mit Pfeilen. Desktop: unverändertes Grid.
(function () {
  document.querySelectorAll(".m-car").forEach(function (wrap) {
    var track = wrap.querySelector(".car-track");
    if (!track) return;
    var prev = document.createElement("button");
    prev.className = "car-btn car-prev"; prev.setAttribute("aria-label", "Previous"); prev.innerHTML = "‹";
    var next = document.createElement("button");
    next.className = "car-btn car-next"; next.setAttribute("aria-label", "Next"); next.innerHTML = "›";
    wrap.appendChild(prev); wrap.appendChild(next);
    function step() {
      var card = track.children[0];
      return card ? card.getBoundingClientRect().width + 16 : 300;
    }
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
  });
})();
