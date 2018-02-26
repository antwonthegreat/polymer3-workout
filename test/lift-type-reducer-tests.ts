/// <reference path="../node_modules/@types/chai/index.d.ts" />

import {expect} from 'chai';
import {reducer} from '../src/state/reducers/reducer.js';
import {liftTypesReceived} from '../src/state/actions/Actions.js';

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
});

