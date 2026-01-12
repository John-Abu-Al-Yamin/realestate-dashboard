import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePostData from "@/hooks/curdsHook/usePostData";
import endPoints from "@/hooks/EndPoints/endPoints";
import queryKeys from "@/hooks/EndPoints/queryKeys";

export const useGetLogsId = (id) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: `${endPoints.activity}/${id}`,
    params: {},
    queryKeys: [queryKeys.activity, id],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    // page,
  };
};
export const useGetAllLogs = (page, type) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.activity,
    params: {
      page,
      ...(type ? { "filter[type]": type } : {}),
    },
    queryKeys: [queryKeys.activity, page, type],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    page,
  };
};
