
import useGetData from "@/hooks/curdsHook/useGetData";
import endPoints from "@/hooks/EndPoints/endPoints";
import queryKeys from "@/hooks/EndPoints/queryKeys";


export const useGetstatistics = (params = {}) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.statistics,
    params: params,
    queryKeys: [queryKeys.statistics, params],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    // page,
  };
};
