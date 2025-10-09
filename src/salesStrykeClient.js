import { com } from "@salesstryke/mobile-api";
import { API_ENDPOINT } from "@env";

let client = null;

export function getSalesStrykeClient() {
  if (client) return client;

  const url = new URL(API_ENDPOINT);
  const scheme = url.protocol.replace(":", "");
  const domain = url.hostname;
  const port = url.port ? parseInt(url.port, 10) : scheme === "https" ? 443 : 80;

  client = new com.salesstryke.client.SalesStrykeClientApi(scheme, domain, port);
  return client;
}
