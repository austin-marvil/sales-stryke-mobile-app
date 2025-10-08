import { com } from "@salesstryke/mobile-api";

function parseEndpoint(endpoint) {
  const regex = /^(https?):\/\/([^/:]+)(?::(\d+))?/i;
  const match = endpoint.match(regex);
  if (!match) throw new Error(`Invalid API endpoint: ${endpoint}`);

  const scheme = match[1].toLowerCase();
  const domain = match[2];
  const port = match[3] ? parseInt(match[3], 10) : (scheme === "https" ? 443 : 80);

  return { scheme, domain, port };
}

let _client = null;

export function getSalesStrykeClient(endpoint = "https://release.api.geo.salesstryke.com") {
  if (_client) return _client;

  const { scheme, domain, port } = parseEndpoint(endpoint);
  _client = new com.salesstryke.client.SalesStrykeClientApi(scheme, domain, port);

  return _client;
}
