import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const tvmoviesAdapter = createEntityAdapter({})

const initialState = tvmoviesAdapter.getInitialState()

export const tvmoviesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTvmovies: builder.query({
            query: () => ({
                url: '/tvmovies',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedTvmovies = responseData.map(tvmovie => {
                    tvmovie.id = tvmovie._id
                    return tvmovie
                });
                return tvmoviesAdapter.setAll(initialState, loadedTvmovies)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Tvmovie', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Tvmovie', id }))
                    ]
                } else return [{ type: 'Tvmovie', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetTvmoviesQuery,
} = tvmoviesApiSlice

// returns the query result object
export const selectTvmoviesResult = tvmoviesApiSlice.endpoints.getTvmovies.select()

// creates memoized selector
const selectTvmoviesData = createSelector(
    selectTvmoviesResult,
    tvmoviesResult => tvmoviesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTvmovies,
    selectById: selectTvmovieById,
    selectIds: selectTvmovieIds
    // Pass in a selector that returns the tvmovies slice of state
} = tvmoviesAdapter.getSelectors(state => selectTvmoviesData(state) ?? initialState)