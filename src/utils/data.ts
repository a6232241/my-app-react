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
 * @param {boolean} [isThrowError=false] - throw error or not
 * @param {boolean} [isCache=true] - cache or not
 * @returns Promise<unknown>
 */
export const fetchData = ({ pathname, signal }: Network, version: number = 1, delay = 0, isThrowError = false, isCache = true) => {
  if (isThrowError) throw new Error("Something went wrong");
  const url = `${origin}${pathname}`;
  const key = `${url}-${version}`;

  const getFetch = () => {
    return fetch(url, { signal })
      .then((res) => res.json())
      .catch((err: unknown) => {
        cache.delete(key);
        return err instanceof Error ? err : new Error(String(err))
      }) as Promise<unknown>;
  }

  const getPromise = () => {
    return delay === 0 ? 
      getFetch() : 
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(getFetch())
        }, delay)
      });
  }

  if (!isCache) {
    cache.delete(`${origin}${pathname}-${version}`);
    return getPromise();
  }
  if (!cache.has(key)) {
    cache.set(key, getPromise());
  }
  return cache.get(key) as Promise<unknown>;
};
