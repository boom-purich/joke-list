const loadingReducer = (state = false,action) => {
    switch(action.type) {

        case 'SET_LOADING' :
            console.log('Loading State : ',action.payload);
            return state = action.payload;

        default:
            return state;
    }
}

export default loadingReducer;