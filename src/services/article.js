import {createAPI, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const articleApi = createAPI({
    reducerPath: 'articleApi',
});