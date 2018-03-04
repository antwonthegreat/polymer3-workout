/// <reference path="../node_modules/@types/chai/index.d.ts" />

import {expect} from 'chai';
import {reducer} from '../src/state/reducers/reducer.js';
import {liftTypesReceived,workoutSummariesReceived, deleteLift} from '../src/state/actions/Actions.js';

describe('lift-type-reducer', ()=>{
    it('liftTypesReceivedAction assigns liftTypes',()=>{
        const initialState = {
            liftTypes:{
                'w':{}
            }
        };

        const nextState = reducer(initialState,liftTypesReceived({'d':{name:'rad',users:{},timed:{key:''},active:false}},{uid:'3'}));
        expect(nextState.liftTypes.d.name).to.equal('rad');
        expect(nextState.liftTypes.w).to.equal(undefined);
    });

    it('liftTypesReceivedAction sets active on each liftType',()=>{
        const initialState = {};

        const nextState = reducer(initialState,liftTypesReceived({
            'd':{name:'rad',users:{'3':{}},timed:{key:''},active:false},
            'c':{name:'rad',users:{'4':{}},timed:{key:''},active:true}
        }
        ,{uid:'3'}));
        expect(nextState.liftTypes.d.active).to.equal(true);
        expect(nextState.liftTypes.c.active).to.equal(false);
    });

    it('workoutSummariesReceived assigns lastCompletedDates to liftTypes',()=>{
        const initialState = {
            liftTypes:{
                'a':{},
                'b':{},
                'c':{},
                'd':{lastCompletedDate:30}
            }
        };

        const nextState = reducer(initialState,workoutSummariesReceived({
            'd':{liftTypeKeys:['b','c'],name:'',orderStartDate:1,startDate:10,id:'1'},
            'e':{liftTypeKeys:['a','b','d'],name:'',orderStartDate:1,startDate:20,id:'1'},
        },{}));

        expect(nextState.liftTypes.a.lastCompletedDate).to.equal(20);
        expect(nextState.liftTypes.b.lastCompletedDate).to.equal(20);
        expect(nextState.liftTypes.c.lastCompletedDate).to.equal(10);
        expect(nextState.liftTypes.d.lastCompletedDate).to.equal(30);
    });

    it('workoutSummariesReceived assigns completed to liftTypes based on workoutType lastCompletedDate',()=>{
        const workoutTypes = {
            'wta':{lastCompletedDate:5},
            'wtb':{lastCompletedDate:25},
            'wtc':{},
            'wtd':{lastCompletedDate:1}
        };

        const initialState = {
            liftTypes:{
                'a':{active:true,workoutTypeKey:'wta'},
                'b':{active:true,workoutTypeKey:'wtb'},
                'c':{active:true,workoutTypeKey:'wtc',lastCompletedDate:30},
                'd':{active:true,workoutTypeKey:'wtd'}
            },
            workoutTypes
        };

        const nextState = reducer(initialState,workoutSummariesReceived({
            'd':{liftTypeKeys:['b','c'],name:'',orderStartDate:1,startDate:10,id:'1'},
            'e':{liftTypeKeys:['a','b'],name:'',orderStartDate:1,startDate:20,id:'1'},
        },workoutTypes));

        expect(nextState.liftTypes.a.completed).to.equal(true,'lift type a should be completed due to having a later completed date (20) than workoutType wta (5)');
        expect(nextState.liftTypes.b.completed).to.equal(false,`lift type b should not be completed due to having an earlier completed date (20) ${nextState.liftTypes.b.lastCompletedDate} than workoutType wtb (25) ${nextState.workoutTypes.wtb.lastCompletedDate}`);
        expect(nextState.liftTypes.c.completed).to.equal(true,'lift type c should be completed due to having a completed date while workoutType wtc has none');
        expect(nextState.liftTypes.d.completed).to.equal(false,'lift type d should not be completed due to not having a completed date while workoutType wtd has one');
    });

    it('deleteLift recalculates lastCompletedDates and completed on liftTypes',()=>{
        const workoutTypes = {
            'wtb':{lastCompletedDate:15}
        };

        const initialState = {
            liftTypes:{
                'a':{},
                'bb':{workoutTypeKey:'wtb'},
                'c':{},
                'd':{lastCompletedDate:30}
            }
        };

        const nextState = reducer(initialState,deleteLift('bb','e',{
            'd':{liftTypeKeys:['bb','c'],name:'',orderStartDate:1,startDate:10,id:'d'},
            'e':{liftTypeKeys:['a','bb','d'],name:'',orderStartDate:1,startDate:20,id:'e'},
        },workoutTypes));

        expect(nextState.liftTypes.a.lastCompletedDate).to.equal(20);
        expect(nextState.liftTypes.bb.lastCompletedDate).to.equal(10);
        expect(nextState.liftTypes.c.lastCompletedDate).to.equal(10);
        expect(nextState.liftTypes.d.lastCompletedDate).to.equal(30);

        expect(nextState.liftTypes.bb.completed).to.equal(false);
    });

    
});

