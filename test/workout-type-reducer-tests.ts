/// <reference path="../node_modules/@types/chai/index.d.ts" />

import {expect} from 'chai';
import {reducer} from '../src/state/reducers/reducer.js';
import {workoutTypesReceived} from '../src/state/actions/Actions.js';

describe('workout-type-reducer', ()=>{
    it('workoutTypesReceivedAction assigns workoutTypes',()=>{
        const initialState = {
            workoutTypes:{
                'w':{}
            }
        };

        const nextState = reducer(initialState,workoutTypesReceived({'d':{users:{},active:false}},{uid:'3'}));
        expect(nextState.workoutTypes.d).to.not.equal(undefined);
        expect(nextState.workoutTypes.w).to.equal(undefined);
    });

    it('workoutTypesReceivedAction sets active on each workoutType',()=>{
        const initialState = {};

        const nextState = reducer(initialState,workoutTypesReceived({
            'd':{users:{'3':{}},active:false},
            'c':{users:{'4':{}},active:true}
        }
        ,{uid:'3'}));
        expect(nextState.workoutTypes.d.active).to.equal(true);
        expect(nextState.workoutTypes.c.active).to.equal(false);
    });

    it('workoutTypesReceivedAction sets lastCompletedDate on each workoutType',()=>{
        const initialState = {};

        const nextState = reducer(initialState,workoutTypesReceived({
            'd':{users:{'3':{startDate:4}},active:false},
            'c':{users:{'4':{}},active:true}
        }
        ,{uid:'3'}));
        expect(nextState.workoutTypes.d.lastCompletedDate).to.equal(4);
        expect(nextState.workoutTypes.c.lastCompletedDate).to.equal(0);
    });
});

