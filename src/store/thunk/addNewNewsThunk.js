import {
    addNews
} from '../actionCreators/add_news_action'

import { notErrorAddNewsAction } from '../actionCreators/not_error_add_news_action'

import { errorAddNewsAction } from '../actionCreators/error_add_news_action'

export const addNewNewsThunkCreator = () => {

    return (dispatch) => {
        const result = fetch('https://content.guardianapis.com/search?api-key=2a9caa79-c72e-412c-bb6f-9958ad4a75fe');

        result.then(result => result.json())
            .then(result => {
                dispatch(notErrorAddNewsAction())
                dispatch(addNews(result.response.results))
            })
            .catch(err => {
                dispatch(errorAddNewsAction())
            })

    }

}