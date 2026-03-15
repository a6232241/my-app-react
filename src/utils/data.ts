const cache = new Map();

export const fetchData = (url: string) => {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url)
        .then((res) => res.json())
        .catch((err) => err),
    );
  }
  return cache.get(url);
};
