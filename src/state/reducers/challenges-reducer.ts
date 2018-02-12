import {Map, fromJS} from 'immutable';
import {ActionTypes,ActionTypeKeys} from '../actions/Actions';

const initialState = Map({
    challenges: Map({
        '0':Map({
            title:"Your First Quest",
            description:"Take a picture of a friend.",
            points:10,
            completed:false
        }),
        '1':Map({
            title:"Life in Motion",
            description:"Take a picture that has motion blur in the subject.",
            points:3,
            completed:false
        })
    })
});

const challengesReducer = (state:any = initialState, action:ActionTypes) => {
    switch (action.type) {
        case ActionTypeKeys.SELECT_CHALLENGE: {
            return fromJS(state).set('selectedChallengeId',action.id).toJS();
            //return {...state, selectedChallengeId:action.id};
        }
        case ActionTypeKeys.SUBMIT_PHOTO : {
            return fromJS(state).set('selectedChallengeId',null).setIn(['challenges',action.challengeId,'completed'],true).toJS();
            // return {...state, 
            //     challenges:{
            //         ...state.challenges,
            //         [action.challengeId]:{
            //             ...state.challenges[action.challengeId],completed:true
            //         }
            //     },
            //     selectedChallengeId:null
            // };
        }
        case ActionTypeKeys.NAVIGATE: {
            const parts = action.route.split('/').filter((part:string)=>part);
            if(parts[0] !== 'challenge')
                return state;
            
            return fromJS(state).set('selectedChallengeId',parts[1]).toJS();
            //return {...state, selectedChallengeId:parts[1]};
        }
        default:
            return (state||initialState).toJS();
    }
};

const challengesSelector = (state:any) => {
    return Object.keys(state.challenge.challenges).filter(id=>!state.challenge.challenges[id].completed).map((id)=>{
        let challenge = state.challenge.challenges[id];
        return {
            ...challenge,
            id
        }
    })
}

const totalPointsSelector = (state:any) => {
    return Object.keys(state.challenge.challenges).reduce((acc:number,id:string)=>{
        let challenge = state.challenge.challenges[id];
        return acc + (challenge.completed ? challenge.points : 0);
    },0)
}

export {challengesReducer};
export {challengesSelector};
export {totalPointsSelector};