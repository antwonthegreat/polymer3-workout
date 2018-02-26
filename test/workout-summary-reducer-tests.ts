/// <reference path="../node_modules/@types/chai/index.d.ts" />

import {expect} from 'chai';
import {reducer} from '../src/state/reducers/reducer.js';
import {workoutSummariesReceived} from '../src/state/actions/Actions.js';
import {workoutSummaryWithLiftNamesSelector} from '../src/state/reducers/workout-summary-reducer'

describe('workout-summary-reducer', ()=>{
    it('workoutSummariesReceived assigns workoutSummaries',()=>{
        const initialState = {
            workoutSummaries:{
                'w':{}
            }
        };

        const nextState = reducer(initialState,workoutSummariesReceived({'d':{liftTypeKeys:[''],name:'',orderStartDate:1,startDate:1,id:'1'}}));
        expect(nextState.workoutSummaries.d).to.not.equal(undefined);
        expect(nextState.workoutSummaries.w).to.equal(undefined);
    });

    it('workoutSummaryWithLiftNamesSelector returns array with lift names added',()=>{
        const initialState:any = {
            workoutSummaries:{
                'a':{liftTypeKeys:['2','3'],name:'',orderStartDate:1,startDate:1,id:'1'},
                'b':{liftTypeKeys:['1'],name:'',orderStartDate:1,startDate:1,id:'1'}
            },
            liftTypes:{
                1:{name:'rad',users:{},timed:{key:''},active:false},
                2:{name:'ical',users:{},timed:{key:''},active:false},
                3:{name:'icious',users:{},timed:{key:''},active:false}
            }
        };

        const workoutSummaries = workoutSummaryWithLiftNamesSelector(initialState);
        expect(workoutSummaries[0].liftTypeNames[0]).to.equal('ical');
        expect(workoutSummaries[0].liftTypeNames[1]).to.equal('icious');
        expect(workoutSummaries[1].liftTypeNames[0]).to.equal('rad');
    });
});

