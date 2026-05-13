document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.querySelector('.proxy');
  const message = document.getElementById('proxyMessage');
  const rawLink = document.getElementById('openRawLink');
  const targetParam = new URLSearchParams(window.location.search).get('target') || '';

  if (!targetParam) {
    if (message) message.textContent = 'No target URL provided; enter a URL or query from the dashboard search bar.';
    return;
  }

  const decoded = decodeURIComponent(targetParam);
  const normalized = normalizeUrl(decoded);
  const proxyUrl = buildScramjetProxyUrl(normalized);
  const displayTarget = isLikelyUrl(decoded)
    ? normalized.replace(/^https?:\/\//i, '')
    : `Search: ${decoded}`;

  const address = document.getElementById('proxyAddress');

  if (message) {
    if (proxyUrl === normalized) {
      message.textContent = 'No Scramjet proxy host configured. Loading raw target directly.';
    } else {
      message.textContent = `Showing proxied result for ${displayTarget}`;
    }
  }

  if (address) {
    address.textContent = displayTarget;
  }

  const debug = document.getElementById('proxyDebug');
  if (debug) {
    debug.textContent = `Target debug: ${decoded}\nProxy URL: ${proxyUrl}`;
  }

  if (iframe) {
    iframe.src = proxyUrl;
  }

  if (rawLink) {
    rawLink.href = normalized;
    rawLink.textContent = 'Open raw target in a new tab';
  }
});
