import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  defaultSerializeQueryArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
const SERVER_UNAVAILABLE_TOAST_ID = "server-unavailable";
const SERVER_UNAVAILABLE_MESSAGE = "Сервер тимчасово не працює";
const ONE_HOUR_IN_SECONDS = 60 * 60;

export const API_TAGS = {
  COURSES: "Courses",
  SPECIALIZATIONS: "Specializations",
} as const;

export type ApiTagType = (typeof API_TAGS)[keyof typeof API_TAGS];

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const baseQueryWithAuthHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === HTTP_STATUS_INTERNAL_SERVER_ERROR && typeof window !== "undefined") {
    toast.error(SERVER_UNAVAILABLE_MESSAGE, {
      id: SERVER_UNAVAILABLE_TOAST_ID,
    });
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "patternLabsApi",
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: Object.values(API_TAGS),
  keepUnusedDataFor: ONE_HOUR_IN_SECONDS,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  invalidationBehavior: "delayed",
  serializeQueryArgs: ({ endpointName, endpointDefinition, queryArgs }) =>
    defaultSerializeQueryArgs({
      endpointName,
      endpointDefinition,
      queryArgs,
    }),
  endpoints: () => ({}),
});
