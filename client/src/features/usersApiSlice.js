import { BASE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/api/user/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLogoutMutation, useRegisterMutation } = usersApiSlice;