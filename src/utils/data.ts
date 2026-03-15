const cache = new Map();

export const fetchData = (url: string, version: number = 1, delay = 0) => {
  const key = `${url}-${version}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      fetch(url)
        .then(async (res) => {
          if (delay) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
          return res;
        })
        .then((res) => res.json())
        .catch((err) => err),
    );
  }
  return cache.get(key);
};
