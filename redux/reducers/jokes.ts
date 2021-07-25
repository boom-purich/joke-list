const jokeReducer = (state = [],action) => {
    switch(action.type) {

        case 'GET_JOKE_LIST':
            return state;

        case 'ADD_JOKE':
            return [...action.payload];

        default :
            return state;
    }
}

export default jokeReducer;