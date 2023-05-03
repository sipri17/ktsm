const initialState = {
    files : [],
    file : {}
}

export default function filesReducer(state=initialState,action ){
    switch (action.type) {
        case "files/fetchSuccess":
            console.log('action:',action);
            return {...state,files:action.payload}    
        case "file/fetchSuccess":
            return {...state,file:action.payload}    
        default:
            return state;
    }
}