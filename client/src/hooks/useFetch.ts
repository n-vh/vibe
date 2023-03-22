import { useRef, useState } from 'react';

export function useFetch<T>(url: string, options?: RequestInit) {
  const cancelRequest = useRef<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = () => {
    cancelRequest.current = false;
    setLoading(true);

    fetch(url, options)
      .then(async (response) => {
        console.log(response);
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.error);
        }
        return json;
      })
      .then((data) => {
        if (cancelRequest.current) return;
        setError(null);
        setData(data);
      })
      .catch((error) => {
        if (cancelRequest.current) return;
        setError(error);
      })
      .finally(() => {
        if (cancelRequest.current) return;
        setLoading(false);
      });

    return () => {
      cancelRequest.current = true;
    };
  };

  const resetError = () => {
    setError(null);
  };

  return [{ data, error, loading }, execute, resetError] as const;
}
