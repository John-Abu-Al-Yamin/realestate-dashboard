import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePostData from "@/hooks/curdsHook/usePostData";
import endPoints from "@/hooks/EndPoints/endPoints";
import queryKeys from "@/hooks/EndPoints/queryKeys";

export const useGetAllManagers = (page = 1, search = "", status = "") => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.managers,
    params: {
      page,
      ...(search ? { "filter[search]": search } : {}),
      ...(status ? { "filter[status]": status } : {}),
    },

    queryKeys: [queryKeys.managers, page, search, status],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    page,
  };
};

export const useGetManagerId = (id, page = 1) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: `${endPoints.managers}/${id}`,
    params: { page },
    queryKeys: [queryKeys.managers, page, id],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    page,
  };
};

export const useAddManager = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.managers,
    [queryKeys.managers]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};
export const useEditManager = (id) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    `${endPoints.managers}/${id}`,
    [queryKeys.managers, id]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

// في useDeleteManager
export const useDeleteManager = (page = 1) => {
  const { mutate, data, error, isPending, isSuccess, isError } = useDeleteData(
    endPoints.managers,
    [queryKeys.managers],
    [queryKeys.managers, page] // تمرير الصفحة هنا
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};
