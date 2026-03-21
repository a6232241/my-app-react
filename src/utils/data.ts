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
 * @params {boolean} [isThrowError=false] - throw error or not
 * @returns Promise<unknown>
 */
export const fetchData = ({ pathname, signal }: Network, version: number = 1, delay = 0, isThrowError = false) => {
  if (isThrowError) throw new Error("Something went wrong");
  const url = `${origin}${pathname}`;
  const key = `${url}-${version}`;
  if (!cache.has(key)) {
    const promise = delay === 0 ? 
    fetch(url, { signal })
      .then((res) => res.json())
      .catch((err: unknown) => {
        cache.delete(key);
        return err instanceof Error ? err : new Error(String(err))
      }) : 
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          fetch(url, { signal })
            .then((res) => res.json())
            .catch((err: unknown) => {
              cache.delete(key);
              return err instanceof Error ? err : new Error(String(err))
            })
        )
      }, delay)
    });

    cache.set(key, promise);
  }
  return cache.get(key) as Promise<unknown>;
};
