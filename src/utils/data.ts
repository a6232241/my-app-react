const cache = new Map<string, Promise<unknown>>();

const origin = "https://jsonplaceholder.typicode.com";

interface Network {
  pathname: string;
  signal?: AbortSignal;
}

/**
 * 
 * @param {Network} network - { pathname: string; signal?: AbortSignal; }
 * @param {number} [version=1] - cache version
 * @param {number} [delay=0] - delay time
 * @returns Promise<unknown>
 */
export const fetchData = ({ pathname, signal }: Network, version: number = 1, delay = 0) => {
  const url = `${origin}${pathname}`;
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
  return cache.get(key) as Promise<unknown>;
};
