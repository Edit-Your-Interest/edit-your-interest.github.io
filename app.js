(() => {
  "use strict";

  const grid = document.getElementById("results-grid");
  const controllers = [];

  for (const result of window.EDIT_RESULTS || []) {
    const card = document.createElement("article");
    card.className = "result-card";
    card.innerHTML = `
      <div class="case-header"><span class="case-id"></span><span class="pair-tag">Original → Edited</span></div>
      <div class="prompt-block"><span class="prompt-label">Editing prompt</span><p class="prompt-text"></p></div>
      <div class="video-pair">
        <figure><video controls muted playsinline preload="none"></video><figcaption>ORIGINAL</figcaption></figure>
        <figure><video controls muted playsinline preload="none"></video><figcaption class="edited-label">EDIT-YOUR-INTEREST</figcaption></figure>
      </div>
      <div class="case-controls"><button type="button" class="button button-secondary pair-play">Play pair</button><button type="button" class="restart-pair">↺ Restart</button></div>
      <p class="pair-status" role="status" aria-live="polite"></p>`;
    card.querySelector(".case-id").textContent = `CASE ${result.id}`;
    const prompt = card.querySelector(".prompt-text");
    prompt.textContent = result.prompt || "Your editing prompt here.";
    prompt.classList.toggle("is-placeholder", !result.prompt);
    const videos = [...card.querySelectorAll("video")];
    videos.forEach((video, index) => {
      video.src = index ? result.edited : result.original;
      video.poster = index ? result.editedPoster : result.originalPoster;
      video.setAttribute("aria-label", `Case ${result.id}: ${index ? "edited" : "original"} video`);
      video.muted = true;
    });
    const playButton = card.querySelector(".pair-play");
    const restartButton = card.querySelector(".restart-pair");
    playButton.setAttribute("aria-label", `Play both videos in case ${result.id}`);
    restartButton.setAttribute("aria-label", `Restart both videos in case ${result.id}`);
    const status = card.querySelector(".pair-status");
    let playing = false;
    let starting = false;
    let animation = 0;
    let generation = 0;

    function pause() {
      generation += 1;
      playing = false;
      starting = false;
      cancelAnimationFrame(animation);
      videos.forEach(video => video.pause());
      playButton.textContent = "Play pair";
      playButton.setAttribute("aria-label", `Play both videos in case ${result.id}`);
      playButton.disabled = false;
      restartButton.disabled = false;
    }

    function tick() {
      if (!playing) return;
      const duration = Math.min(...videos.map(video => video.duration));
      // Loop on the shared duration, including pairs with different lengths.
      if (Number.isFinite(duration) && videos.some(video => video.ended || video.currentTime >= duration - 0.05)) {
        videos.forEach(video => { video.currentTime = 0; });
        videos.forEach(video => { video.play().catch(() => pause()); });
      } else if (Math.abs(videos[0].currentTime - videos[1].currentTime) > 0.15) {
        videos[1].currentTime = videos[0].currentTime;
      }
      animation = requestAnimationFrame(tick);
    }

    async function play(restart = false) {
      controllers.forEach(controller => { if (controller.card !== card) controller.pause(); });
      document.getElementById("main-demo").pause();
      pause();
      const attempt = generation;
      starting = true;
      playButton.disabled = true;
      restartButton.disabled = true;
      status.textContent = "";
      if (restart || videos.some(video => video.ended)) {
        videos.forEach(video => { video.currentTime = 0; });
      } else {
        const time = Math.min(...videos.map(video => video.currentTime));
        videos.forEach(video => { video.currentTime = time; });
      }
      try {
        await Promise.all(videos.map(video => video.play()));
        if (generation !== attempt) return;
        starting = false;
        playing = true;
        playButton.textContent = "Pause pair";
        playButton.setAttribute("aria-label", `Pause both videos in case ${result.id}`);
        playButton.disabled = false;
        restartButton.disabled = false;
        animation = requestAnimationFrame(tick);
      } catch {
        if (generation !== attempt) return;
        pause();
        status.textContent = "Unable to play this pair. Try the individual video controls.";
      }
    }

    playButton.addEventListener("click", () => playing ? pause() : play());
    restartButton.addEventListener("click", () => play(true));
    videos.forEach(video => {
      video.addEventListener("pause", () => {
        if (playing && !video.ended) pause();
      });
      video.addEventListener("play", () => {
        if (!starting && !playing) {
          controllers.forEach(controller => { if (controller.card !== card) controller.pause(); });
          document.getElementById("main-demo").pause();
        }
      });
      video.addEventListener("seeking", () => {
        if (!playing) return;
        const other = videos.find(item => item !== video);
        if (Math.abs(other.currentTime - video.currentTime) > 0.15) other.currentTime = video.currentTime;
      });
      video.addEventListener("ratechange", () => {
        if (playing) videos.forEach(item => { item.playbackRate = video.playbackRate; });
      });
    });
    controllers.push({ card, pause });
    grid.append(card);
  }

  // Pause comparisons that leave the viewport; avoid playing hidden videos.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) controllers.find(item => item.card === entry.target)?.pause();
      });
    });
    controllers.forEach(controller => observer.observe(controller.card));
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      controllers.forEach(controller => controller.pause());
      document.getElementById("main-demo").pause();
    }
  });
  document.getElementById("main-demo").addEventListener("play", () => controllers.forEach(controller => controller.pause()));

  document.getElementById("copy-citation").addEventListener("click", async () => {
    const citation = document.getElementById("bibtex");
    const status = document.getElementById("copy-status");
    try {
      await navigator.clipboard.writeText(citation.textContent);
      status.textContent = "Citation copied.";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(citation);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      status.textContent = "Citation selected. Press Ctrl+C (or ⌘C) to copy.";
    }
  });
})();
