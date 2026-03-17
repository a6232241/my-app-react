const cache = new Map();

export const fetchData = (url: string, version: number = 1, delay = 0) => {
  const key = `${url}-${version}`;
  if (!cache.has(key)) {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          fetch(url)
            .then((res) => res.json())
            .catch((err) => err)
        )
      }, delay)
    });

    cache.set(key, promise);
  }
  return cache.get(key);
};
