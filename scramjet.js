/*
  Scramjet proxy helper.
  This uses a real transport proxy host to route browser traffic through a proxy.
  Replace SCRAMJET_PROXY_HOST with your own Scramjet proxy endpoint if available.
*/
const SCRAMJET_PROXY_HOST = 'https://corsproxy.io/?';

function isLikelyUrl(input) {
  if (!input) return false;
  const trimmed = input.trim();
  if (/\s/.test(trimmed)) return false;
  const pattern = /^(?:https?:\/\/)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?:[\/\?#][^\s]*)?$/i;
  return pattern.test(trimmed);
}

function normalizeUrl(input) {
  let value = input.trim();
  if (!/^https?:\/\//i.test(value)) {
    value = 'https://' + value;
  }
  return value;
}

function buildSearchUrl(query) {
  return `https://html.duckduckgo.com/html?q=${encodeURIComponent(query)}`;
}

function buildProxyTarget(input) {
  const trimmed = input.trim();
  if (!trimmed) return '';
  return isLikelyUrl(trimmed) ? normalizeUrl(trimmed) : buildSearchUrl(trimmed);
}

function buildScramjetProxyUrl(targetUrl) {
  const host = SCRAMJET_PROXY_HOST.trim();
  if (!host || host.includes('replace-with')) {
    return targetUrl;
  }
  if (host.endsWith('?')) {
    return `${host}${encodeURIComponent(targetUrl)}`;
  }
  if (host.includes('?')) {
    return `${host}&url=${encodeURIComponent(targetUrl)}`;
  }
  return `${host}?url=${encodeURIComponent(targetUrl)}`;
}
