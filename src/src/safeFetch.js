export async function safeFetch(url, opts = {}, { retries = 3, baseMs = 400 } = {}) {
  for (let i = 0; i <= retries; i++) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(url, { ...opts, signal: controller.signal });
      clearTimeout(t);
      if (res.ok) return res;
      if (res.status >= 500 && i < retries) {
        const wait = baseMs * 2 ** i + Math.random() * 200;
        await new Promise(r => setTimeout(r, wait));
        continue;
      }
      return res;
    } catch (e) {
      clearTimeout(t);
      if (i === retries) throw e;
      const wait = baseMs * 2 ** i + Math.random() * 200;
      await new Promise(r => setTimeout(r, wait));
    }
  }
}
