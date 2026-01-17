import useDeleteData from "@/hooks/curdsHook/useDeleteData";
import useGetData from "@/hooks/curdsHook/useGetData";
import usePostData from "@/hooks/curdsHook/usePostData";
import usePutData from "@/hooks/curdsHook/usePutData";
import endPoints from "@/hooks/EndPoints/endPoints";
import queryKeys from "@/hooks/EndPoints/queryKeys";

export const useGetAllCountries = (page = 1) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.countries,
    params: {
      page,
    },

    queryKeys: [queryKeys.countries, page],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    page,
  };
};
export const useGetCountryId = (id) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: `${endPoints.countries}/${id}`,
    params: {
      id,
    },

    queryKeys: [queryKeys.countries, id],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    // page,
  };
};

export const useAddCountry = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.countries,
    [queryKeys.countries],
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};
export const useEditCountry = (id) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePutData(
    `${endPoints.countries}/${id}`,
    [queryKeys.countries, id],
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useDeleteCountry = (page = 1) => {
  const { mutate, data, error, isPending, isSuccess, isError } = useDeleteData(
    endPoints.countries,
    [queryKeys.countries],
    [queryKeys.countries, page],
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};
