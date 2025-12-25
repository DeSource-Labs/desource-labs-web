const SKIPPED_HEADERS = ['host', 'content-length', 'content-encoding', 'connection'];
const SKIPPED_HEADERS_RESPONSE = ['content-encoding', 'content-length'];

export default defineEventHandler(async (event) => {
  const path = event.context.params?.path;
  if (!path) return;

  const target = `https://eu.i.posthog.com/${path}`;

  const body =
    event.method === 'POST' || event.method === 'PUT'
      ? await readRawBody(event)
      : undefined;

  const incomingHeaders = getHeaders(event);

  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(incomingHeaders)) {
    const k = key.toLowerCase();
    if (SKIPPED_HEADERS.includes(k)) {
      continue;
    }
    if (typeof value === 'string') {
      headers[key] = value;
    }
  }

  const res = await fetch(target, {
    method: event.method,
    headers,
    body,
  });

  setResponseStatus(event, res.status);

  res.headers.forEach((value, key) => {
    if (!SKIPPED_HEADERS_RESPONSE.includes(key.toLowerCase())) {
      setHeader(event, key, value);
    }
  });

  return res.body;
});
