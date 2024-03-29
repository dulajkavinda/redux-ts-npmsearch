import axios from "axios";
import { Action } from "../actions";
import { Dispatch } from "redux";
import { ActionTypes } from "../action-types";


export const searchRepositories = (term: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.SEARCH_REPOSITORIES
        });

        try {
            const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', {
                params: {
                    text: term
                }
            })

            const names = data.objects.map((result: any) => {
                return result.package.name;
            })

            dispatch({
                type: ActionTypes.SEARCH_REPOSITORIES_SUCCESS,
                payload: names
            })

        } catch (error) {
            dispatch({
                type: ActionTypes.SEARCH_REPOSITORIES_ERROR,
                payload: error.message
            })
        }
    }
}