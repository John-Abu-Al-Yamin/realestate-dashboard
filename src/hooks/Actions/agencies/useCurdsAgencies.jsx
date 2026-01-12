import useGetData from "@/hooks/curdsHook/useGetData";
import usePostData from "@/hooks/curdsHook/usePostData";
import usePutData from "@/hooks/curdsHook/usePutData";
import endPoints from "@/hooks/EndPoints/endPoints";
import queryKeys from "@/hooks/EndPoints/queryKeys";

export const useGetAllAgencies = (page) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.agencies,
    params: { page },
    queryKeys: [queryKeys.agencies, page],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    page,
  };
};

export const useGetAllStepsAgencies = (agencyId, page = 1) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: `${endPoints.agencies}/${agencyId}/steps`,
    params: { page },
    queryKeys: [queryKeys.agencies, page, agencyId],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    page,
  };
};

export const useAddManagerTheAgency = () => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    endPoints.agencies,
    [queryKeys.agencies]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useAddAgencyMasterData = (agencyId) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    `${endPoints.agencies}/${agencyId}/master-data`,
    [queryKeys.agencies, agencyId]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useAddAgencyProfile = (agencyId) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    `${endPoints.agencies}/${agencyId}/profile`,
    [queryKeys.agencies, agencyId]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useAddAgencyVerification = (agencyId) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    `${endPoints.agencies}/${agencyId}/verification`,
    [queryKeys.agencies, agencyId]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useAddAgencyLegal = (agencyId) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    `${endPoints.agencies}/${agencyId}/legal`,
    [queryKeys.agencies, agencyId]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useAddAgencyVisualIdentity = (agencyId) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    `${endPoints.agencies}/${agencyId}/visual-identity`,
    [queryKeys.agencies, agencyId]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

// Agancy Details
export const useGetAgencyLegalDetails = (agencyId) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: `${endPoints.agencies}/${agencyId}/legal`,
    params: {},
    queryKeys: [queryKeys.agencies, agencyId, "legal"],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
  };
};

export const useGetAgencyMasterDataDetails = (agencyId) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: `${endPoints.agencies}/${agencyId}/master-data`,

    params: {},
    queryKeys: [queryKeys.agencies, agencyId, "master-data"],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
  };
};

export const useGetAgencyProfileDetails = (agencyId) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: `${endPoints.agencies}/${agencyId}/profile`,
    params: {},
    queryKeys: [queryKeys.agencies, agencyId, "profile"],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
  };
};

export const useGetAgencyVerificationDetails = (agencyId) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: `${endPoints.agencies}/${agencyId}/verification`,
    params: {},
    queryKeys: [queryKeys.agencies, agencyId, "verification"],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
  };
};

export const useGetAgencyVisualIdentityDetails = (agencyId) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: `${endPoints.agencies}/${agencyId}/visual-identity`,
    params: {},
    queryKeys: [queryKeys.agencies, agencyId, "visual-identity"],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
  };
};

// Agancy Edite

export const useEditeAgencyLegal = (agencyId, legalId) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePutData(
    `${endPoints.agencies}/${agencyId}/legal/${legalId}`,
    [queryKeys.agencies, agencyId]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useEditeAgencyMasterData = (agencyId, masterDataId) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePutData(
    `${endPoints.agencies}/${agencyId}/master-data/${masterDataId}`,
    [queryKeys.agencies, agencyId]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useEditeAgencyProfile = (agencyId, profileId) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePutData(
    `${endPoints.agencies}/${agencyId}/profile/${profileId}`,
    [queryKeys.agencies, agencyId]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

export const useEditeAgencyVerification = (agencyId, verificationId) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    `${endPoints.agencies}/${agencyId}/verification/${verificationId}`,
    [queryKeys.agencies, agencyId]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};
export const useEditeAgencyVerificationIdentity = (
  agencyId,
  verificationIdentityId
) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePostData(
    `${endPoints.agencies}/${agencyId}/visual-identity/${verificationIdentityId}`,
    [queryKeys.agencies, agencyId]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

// edite Manger Agency
export const useEditeAgencyManager = (agencyId) => {
  const { mutate, data, error, isPending, isSuccess, isError } = usePutData(
    `${endPoints.agencies}/${agencyId}`,
    [queryKeys.agencies, agencyId]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
};

// agencies/for-subscription

export const useGetAllAgenciesForSubscription = (page = 1) => {
  const { data, isPending, refetch, ...rest } = useGetData({
    url: endPoints.agenciesForSubscription,
    params: { page },
    queryKeys: [queryKeys.agenciesForSubscription, page],
  });

  return {
    data,
    isPending,
    isError: rest.error,
    refetch,
    page,
  };
};
