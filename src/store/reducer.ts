
interface IState {
    mykey:number
}
const defaultState:IState = {
    mykey:1
}

interface IAction{
    type:string;
    value?:unknown;
}

// eslint-disable-next-line
export default (state = defaultState, action:IAction) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type){
        case "ChangeKey":
            newState.mykey++;
            break;
        default:
            break;  
    }
    return newState;
}