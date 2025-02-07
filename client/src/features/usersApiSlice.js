import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => ({
        url: `http://localhost:8000/api/user/logout`,
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
