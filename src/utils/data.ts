const cache = new Map();

export const fetchData = (url: string, version: number = 1, delay = 0, signal?: AbortSignal) => {
  const key = `${url}-${version}`;
  if (!cache.has(key)) {
    const promise = delay === 0 ? 
    fetch(url, { signal })
      .then((res) => res.json())
      .catch((err) => {
        // cache.delete(key);
        return err
      }) : 
    new Promise((resolve) => {
      setTimeout(() => {
        console.log('signal', signal);
        resolve(
          fetch(url, { signal })
            .then((res) => res.json())
            .catch((err) => {
              // cache.delete(key);
              return err
      })
        )
      }, delay)
    });

    cache.set(key, promise);
  }
  return cache.get(key);
};
