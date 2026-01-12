import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePostData from "@/hooks/curdsHook/usePostData";
import usePutData from "@/hooks/curdsHook/usePutData";
import endPoints from "@/hooks/EndPoints/endPoints";
import queryKeys from "@/hooks/EndPoints/queryKeys";

export const useGetAllSubscriptions = (page = 1, search = "", status = "") => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.subscriptions,
    params: {
      page,
      ...(search ? { "filter[search]": search } : {}),
      ...(status ? { "filter[active]": status } : {}),
    },
    queryKeys: [queryKeys.subscriptions, page, search, status],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    page,
  };
};

export const useDeleteSubscription = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = useDeleteData(
    endPoints.subscriptions,
    [queryKeys.subscriptions],
    [queryKeys.subscriptions]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useGetSubscriptionId = (id) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: `${endPoints.subscriptions}/${id}`,
    params: {},
    queryKeys: [queryKeys.subscriptions, id],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    // page,
  };
};




export const useAddSubscription = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.subscriptions,
    [queryKeys.subscriptions]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};




export const useEditeSubscription = (id) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePutData(
    `${endPoints.subscriptions}/${id}`,
    [queryKeys.subscriptions, id]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};