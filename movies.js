document.addEventListener('DOMContentLoaded', () => {
  const moviesGrid = document.querySelector('.grid');
  const overlay = document.getElementById('overlay');
  const movieTitle = document.getElementById('movieTitle');
  const episodeControls = document.getElementById('episodeControls');
  const episodeSelect = document.getElementById('ep-select');
  const launchBtn = document.getElementById('launch-btn');
  const homeButton = document.querySelector('.close-game-panel');

  let moviesData = [];
  let currentMovie = null;

  const loadMovies = async () => {
    try {
      const response = await fetch('movies.json');
      if (!response.ok) throw new Error(`Failed to load movies.json: ${response.status}`);
      moviesData = await response.json();
    } catch (error) {
      console.error('Could not load movie list:', error);
      moviesData = [];
    }

    renderMovies();
    syncFromUrl();
  };

  const renderMovies = () => {
    moviesGrid.innerHTML = '';
    moviesData.forEach((movie) => {
      const item = document.createElement('div');
      item.className = 'game-item';
      item.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}" class="card">
        <span class="gametitle">${movie.title}</span>
      `;

      item.addEventListener('click', () => handleItemClick(movie));
      moviesGrid.appendChild(item);
    });
  };

  const handleItemClick = (movie) => {
    if (movie.type === 'movie') {
      window.location.href = movie.file;
      return;
    }

    if (movie.type === 'series' && Array.isArray(movie.episodes)) {
      currentMovie = movie;
      movieTitle.textContent = movie.title;
      episodeControls.style.display = 'flex';
      episodeSelect.innerHTML = '<option value="">Choose an episode</option>';
      movie.episodes.forEach((episode) => {
        const option = document.createElement('option');
        option.value = episode.id;
        option.textContent = episode.title;
        episodeSelect.appendChild(option);
      });
      overlay.classList.add('open');
      if (homeButton) homeButton.style.display = 'none';
      updateUrl(movie.id);
    }
  };

  const getMovieFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  };

  const updateUrl = (movieId) => {
    const url = new URL(window.location);
    url.searchParams.set('id', movieId);
    history.pushState({}, '', url);
  };

  const clearUrl = () => {
    const url = new URL(window.location);
    url.searchParams.delete('id');
    history.replaceState({}, '', url);
  };

  const syncFromUrl = () => {
    const movieId = getMovieFromUrl();
    if (!movieId) {
      closeOverlay();
      return;
    }
    const movie = moviesData.find((item) => item.id === movieId);
    if (movie && movie.type === 'series') {
      handleItemClick(movie);
    }
  };

  const onEpisodeSelect = () => {
    const episodeId = episodeSelect.value;
    launchBtn.disabled = !episodeId;
  };

  const launchEpisode = () => {
    if (!currentMovie) return;
    const episodeId = episodeSelect.value;
    const episode = currentMovie.episodes.find((item) => item.id === episodeId);
    if (!episode) return;
    window.location.href = episode.file;
  };

  const closeOverlay = () => {
    overlay.classList.remove('open');
    currentMovie = null;
    episodeSelect.value = '';
    launchBtn.disabled = true;
    if (homeButton) homeButton.style.display = '';
    clearUrl();
  };

  const closeIfOutside = (event) => {
    if (event.target === overlay) {
      closeOverlay();
    }
  };

  episodeSelect.addEventListener('change', onEpisodeSelect);
  launchBtn.addEventListener('click', launchEpisode);

  window.closeIfOutside = closeIfOutside;
  window.closeOverlay = closeOverlay;

  window.addEventListener('popstate', syncFromUrl);

  loadMovies();
});
