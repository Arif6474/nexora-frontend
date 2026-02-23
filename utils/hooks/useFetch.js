import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function useFetch(url, shouldFetch = true) {
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? url : null,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate, // to revalidate or update cache manually
  };
}

