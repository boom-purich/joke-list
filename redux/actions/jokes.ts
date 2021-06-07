export const GET_JOKE_LIST = () => {
    return {
        type: 'GET_JOKE_LIST',
    }
}

export const ADD_JOKE = (payload) => {
    return {
        type: 'ADD_JOKE',
        payload: payload,
    }
}