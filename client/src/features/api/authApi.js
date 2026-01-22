import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoginFailed } from "../authSlice";

const USER_API = "http://localhost:8080/api/v1/user";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (inputData) => ({
                url: "/register",
                method: "POST",
                body: inputData,
            }),
        }),
        login: builder.mutation({
            query: (inputData) => ({
                url: "/login",
                method: "POST",
                body: inputData,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    dispatch(userLoginFailed(error.data.message));
                }
            }
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;