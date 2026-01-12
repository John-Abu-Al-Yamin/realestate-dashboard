import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import usePostData from "@/hooks/curdsHook/usePostData";
import useGetData from "@/hooks/curdsHook/useGetData";
import endPoints from "@/hooks/EndPoints/endPoints";
import queryKeys from "@/hooks/EndPoints/queryKeys";

export const useGetRegions = () => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.regions,
    params: {},
    queryKeys: [queryKeys.regions],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    // page,
  };
};
