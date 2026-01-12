
import useGetData from "@/hooks/curdsHook/useGetData";
import endPoints from "@/hooks/EndPoints/endPoints";
import queryKeys from "@/hooks/EndPoints/queryKeys";


export const useGetstatistics = () => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.statistics,
    params: {},
    queryKeys: [queryKeys.statistics],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    // page,
  };
};
