import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePostData from "@/hooks/curdsHook/usePostData";
import endPoints from "@/hooks/EndPoints/endPoints";
import queryKeys from "@/hooks/EndPoints/queryKeys";

export const useGetAllSubscriptionPlans = (
  page = 1,
  search = "",
  status = ""
) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.subscriptionplans,
    params: {
      page,
      ...(search ? { "filter[search]": search } : {}),
      ...(status ? { "filter[active]": status } : {}),
    },
    queryKeys: [queryKeys.subscriptionplans, page, search, status],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    // page,
  };
};

export const useGetSubscriptionPlanId = (id) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: `${endPoints.subscriptionplans}/${id}`,
    params: {},
    queryKeys: [queryKeys.subscriptionplans, id],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    // page,
  };
};

export const useDeleteSubscriptionPlan = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = useDeleteData(
    endPoints.subscriptionplans,
    [queryKeys.subscriptionplans],
    [queryKeys.subscriptionplans]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useAddSubscriptionPlan = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.subscriptionplans,
    [queryKeys.subscriptionplans]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useEditSubscriptionPlan = (id) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    `${endPoints.subscriptionplans}/${id}`,
    [queryKeys.subscriptionplans, id]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};
