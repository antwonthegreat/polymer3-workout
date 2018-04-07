/// <reference path="../node_modules/@types/chai/index.d.ts" />

import {expect} from 'chai';
import {reducer} from '../src/state/reducers/reducer.js';
import {selectedWorkoutCleared,selectedWorkoutReceived,selectWeight,selectRep,updateSelectedWorkoutSetWeight,updateSelectedWorkoutSetReps, deleteSet, deleteLift, addLift, addSet} from '../src/state/actions/Actions.js';
import {selectedWorkoutSelector,selectedWorkoutSetSelector} from '../src/state/reducers/selected-workout-reducer';

describe('selected-workout-reducer', ()=>{
    it('selectedWorkoutCleared empties all properties from selectedWorkout',()=>{
        const initialState = {
            selectedWorkout:{
                workout:{},
                workoutSet:{},
                editMode:'wsffsf',
                liftTypeKey:'adsasdasd'
            }
        };

        const nextState = reducer(initialState,selectedWorkoutCleared());
        expect(Object.keys(nextState.selectedWorkout).length).to.equal(0);
    });

    it('selectedWorkoutReceived empties all other properties and sets workout',()=>{
        const initialState = {
            selectedWorkout:{
                workoutSet:{},
                editMode:'wsffsf',
                liftTypeKey:'adsasdasd'
            }
        };

        const workout = {key:'a',lifts:[],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const nextState = reducer(initialState,selectedWorkoutReceived(workout));
        expect(Object.keys(nextState.selectedWorkout).length).to.equal(1);
        expect(nextState.selectedWorkout.workout).to.equal(workout);
    });

    it('selectWeight leaves workout, sets editMode, liftTypeKey, and workoutSet',()=>{
        const workout = {key:'a',lifts:[],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const initialState = {
            selectedWorkout:{
                workout:workout
            }
        };

        const nextState = reducer(initialState,selectWeight({name:'b'},'a') );
        expect(nextState.selectedWorkout.workout.name).to.equal(workout.name);
        expect(nextState.selectedWorkout.liftTypeKey).to.equal('a');
        expect(nextState.selectedWorkout.workoutSet.name).to.equal('b');        
        expect(nextState.selectedWorkout.editMode).to.equal('weight');
    });

    it('selectReps leaves workout, sets editMode, liftTypeKey, and workoutSet',()=>{
        const workout = {key:'a',lifts:[],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const initialState = {
            selectedWorkout:{
                workout:workout
            }
        };

        const nextState = reducer(initialState,selectRep({name:'b'},'a') );
        expect(nextState.selectedWorkout.workout.name).to.equal(workout.name);
        expect(nextState.selectedWorkout.liftTypeKey).to.equal('a');
        expect(nextState.selectedWorkout.workoutSet.name).to.equal('b');        
        expect(nextState.selectedWorkout.editMode).to.equal('rep');
    });

    it('updateSelectedWorkoutSetWeight sets only the weight of selected workout set in selected workout, clears edit mode',()=>{
        const workoutSet = {key:'a',reps:1,weight:1};
        const selectedWorkoutSet = {key:'b',reps:1,weight:1};
        const lift = {liftTypeKey:'c',sets:[workoutSet,selectedWorkoutSet]};
        const selectedLift = {liftTypeKey:'d',sets:[workoutSet,selectedWorkoutSet]};
        const workout = {key:'e',lifts:[lift,selectedLift],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const initialState = {
            selectedWorkout:{
                workout:workout,
                liftTypeKey:'d',
                workoutSet:selectedWorkoutSet,
                editMode:'weight'
            }
        };

        const nextState = reducer(initialState,updateSelectedWorkoutSetWeight(2));

        expect(nextState.selectedWorkout.workout.lifts[0].sets[1].weight).to.equal(1);
        expect(nextState.selectedWorkout.workout.lifts[0].sets[1].reps).to.equal(1);
        expect(nextState.selectedWorkout.workout.lifts[1].sets[0].weight).to.equal(1);
        expect(nextState.selectedWorkout.workout.lifts[1].sets[0].reps).to.equal(1);
        expect(nextState.selectedWorkout.workout.lifts[1].sets[1].weight).to.equal(2);
        expect(nextState.selectedWorkout.workout.lifts[1].sets[1].reps).to.equal(1);
        expect(nextState.selectedWorkout.editMode).to.equal(null);
    });

    it('updateSelectedWorkoutSetReps sets only the weight of selected workout set in selected workout, clears edit mode',()=>{
        const workoutSet = {key:'a',reps:1,weight:1};
        const selectedWorkoutSet = {key:'b',reps:1,weight:1};
        const lift = {liftTypeKey:'c',sets:[workoutSet,selectedWorkoutSet]};
        const selectedLift = {liftTypeKey:'d',sets:[workoutSet,selectedWorkoutSet]};
        const workout = {key:'e',lifts:[lift,selectedLift],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const initialState = {
            selectedWorkout:{
                workout:workout,
                liftTypeKey:'d',
                workoutSet:selectedWorkoutSet,
                editMode:'weight'
            }
        };

        const nextState = reducer(initialState,updateSelectedWorkoutSetReps(2));

        expect(nextState.selectedWorkout.workout.lifts[0].sets[1].weight).to.equal(1);
        expect(nextState.selectedWorkout.workout.lifts[0].sets[1].reps).to.equal(1);
        expect(nextState.selectedWorkout.workout.lifts[1].sets[0].weight).to.equal(1);
        expect(nextState.selectedWorkout.workout.lifts[1].sets[0].reps).to.equal(1);
        expect(nextState.selectedWorkout.workout.lifts[1].sets[1].weight).to.equal(1);
        expect(nextState.selectedWorkout.workout.lifts[1].sets[1].reps).to.equal(2);
        expect(nextState.selectedWorkout.editMode).to.equal(null);
    });

    it('deleteSet removesworkoutSet from correct lift',()=>{
        const workoutSet = {key:'a',reps:1,weight:1};
        const selectedWorkoutSet = {key:'b',reps:1,weight:1};
        const lift = {liftTypeKey:'c',sets:[workoutSet,selectedWorkoutSet]};
        const selectedLift = {liftTypeKey:'d',sets:[workoutSet,selectedWorkoutSet]};
        const workout = {key:'e',lifts:[lift,selectedLift],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const initialState = {
            selectedWorkout:{
                workout:workout,
                liftTypeKey:'d',
                workoutSet:selectedWorkoutSet,
                editMode:'weight'
            }
        };

        const nextState = reducer(initialState,deleteSet('a','d'));

        expect(nextState.selectedWorkout.workout.lifts[0].sets.length).to.equal(2);
        expect(nextState.selectedWorkout.workout.lifts[1].sets.length).to.equal(1);
        expect(nextState.selectedWorkout.workout.lifts[1].sets[0].key).to.equal('b');
    });

    it('deleteSet does nothing if lift is not found',()=>{
        const workoutSet = {key:'a',reps:1,weight:1};
        const selectedWorkoutSet = {key:'b',reps:1,weight:1};
        const lift = {liftTypeKey:'c',sets:[workoutSet,selectedWorkoutSet]};
        const selectedLift = {liftTypeKey:'d',sets:[workoutSet,selectedWorkoutSet]};
        const workout = {key:'e',lifts:[lift,selectedLift],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const initialState = {
            selectedWorkout:{
                workout:workout,
                liftTypeKey:'d',
                workoutSet:selectedWorkoutSet,
                editMode:'weight'
            }
        };

        const nextState = reducer(initialState,deleteSet('a','f'));

        expect(nextState.selectedWorkout.workout.lifts[0].sets.length).to.equal(2);
        expect(nextState.selectedWorkout.workout.lifts[1].sets.length).to.equal(2);
    });

    it('deleteSet does nothing if set is not found',()=>{
        const workoutSet = {key:'a',reps:1,weight:1};
        const selectedWorkoutSet = {key:'b',reps:1,weight:1};
        const lift = {liftTypeKey:'c',sets:[workoutSet,selectedWorkoutSet]};
        const selectedLift = {liftTypeKey:'d',sets:[workoutSet,selectedWorkoutSet]};
        const workout = {key:'e',lifts:[lift,selectedLift],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const initialState = {
            selectedWorkout:{
                workout:workout,
                liftTypeKey:'d',
                workoutSet:selectedWorkoutSet,
                editMode:'weight'
            }
        };

        const nextState = reducer(initialState,deleteSet('g','c'));

        expect(nextState.selectedWorkout.workout.lifts[0].sets.length).to.equal(2);
        expect(nextState.selectedWorkout.workout.lifts[1].sets.length).to.equal(2);
    });

    it('deleteLift removes lift from selectedWorkout',()=>{
        const lift = {liftTypeKey:'c',sets:[]};
        const selectedLift = {liftTypeKey:'d',sets:[]};
        const workout = {key:'e',lifts:[lift,selectedLift],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const initialState = {
            selectedWorkout:{
                workout:workout,
                liftTypeKey:'d',
                editMode:'weight'
            }
        };

        const nextState = reducer(initialState,deleteLift('c'));

        expect(nextState.selectedWorkout.workout.lifts.length).to.equal(1);
        expect(nextState.selectedWorkout.workout.lifts[0].liftTypeKey).to.equal('d');
    });

    it('deleteLift does nothing if lift is not found',()=>{
        const workoutSet = {key:'a',reps:1,weight:1};
        const selectedWorkoutSet = {key:'b',reps:1,weight:1};
        const lift = {liftTypeKey:'c',sets:[workoutSet,selectedWorkoutSet]};
        const selectedLift = {liftTypeKey:'d',sets:[workoutSet,selectedWorkoutSet]};
        const workout = {key:'e',lifts:[lift,selectedLift],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const initialState = {
            selectedWorkout:{
                workout:workout,
                liftTypeKey:'d',
                workoutSet:selectedWorkoutSet,
                editMode:'weight'
            }
        };

        const nextState = reducer(initialState,deleteLift('f'));

        expect(nextState.selectedWorkout.workout.lifts.length).to.equal(2);
    });

    it('addLift pushes new lift onto selectedWorkout',()=>{
        const workoutSet = {key:'a',reps:1,weight:1};
        const selectedWorkoutSet = {key:'b',reps:1,weight:1};
        const lift = {liftTypeKey:'c',sets:[workoutSet,selectedWorkoutSet]};
        const lift2 = {liftTypeKey:'d',sets:[workoutSet,selectedWorkoutSet]};
        const workout = {key:'e',lifts:[lift,lift2],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const initialState = {
            selectedWorkout:{
                workout:workout,
                liftTypeKey:'d',
                workoutSet:selectedWorkoutSet,
                editMode:'weight'
            }
        };

        const nextState = reducer(initialState,addLift('liftTypeKey','selectedWorkout',new Date(123)));

        expect(nextState.selectedWorkout.workout.lifts.length).to.equal(3);
        expect(nextState.selectedWorkout.workout.lifts[2].liftTypeKey).to.equal('liftTypeKey');
        expect(nextState.selectedWorkout.workout.lifts[2].orderStartDate).to.equal(-123);
        expect(nextState.selectedWorkout.workout.lifts[2].startDate).to.equal(123);
        expect(nextState.selectedWorkout.workout.lifts[2].sets.length).to.equal(0);
        expect(nextState.selectedWorkout.workout.lifts[2].workoutKey).to.equal('selectedWorkout');
    });

    it('addSet pushes new set onto selectedWorkout on correct lift',()=>{
        const workoutSet = {key:'a',reps:1,weight:1};
        const selectedWorkoutSet = {key:'b',reps:1,weight:1};
        const lift = {liftTypeKey:'c',sets:[workoutSet,selectedWorkoutSet]};
        const lift2 = {liftTypeKey:'d',sets:[workoutSet,selectedWorkoutSet]};
        const workout = {key:'e',lifts:[lift,lift2],name:'a',orderStartDate:1,startDate:1,id:'1'};
        const initialState = {
            selectedWorkout:{
                workout:workout,
                liftTypeKey:'d',
                workoutSet:selectedWorkoutSet,
                editMode:'weight'
            }
        };

        const nextState = reducer(initialState,addSet('d'));

        expect(nextState.selectedWorkout.workout.lifts.length).to.equal(2);
        expect(nextState.selectedWorkout.workout.lifts[0].sets.length).to.equal(2);
        expect(nextState.selectedWorkout.workout.lifts[1].sets.length).to.equal(3);
    });

    it('selectedWorkoutSelector returns null if no selectedWorkout',()=>{
        const initialState:any = {
            selectedWorkout:{
            }
        };

        const workout = selectedWorkoutSelector(initialState);
        expect(workout).to.equal(null);
    });

    it('selectedWorkoutSelector assigns liftType, rep and weight labels, and name to each lift',()=>{
        const initialState:any = {
            selectedWorkout:{
                workout:{
                    lifts:[
                        {liftTypeKey:'a'},
                        {liftTypeKey:'b'},
                        {liftTypeKey:'c'}
                    ]
                }
            },
            liftTypes:{
                'a':{name:'alpha'},
                'b':{name:'beta',timed:{key:true}}
            }
        };

        const workout = selectedWorkoutSelector(initialState);
        expect(workout.lifts[0].name).to.equal('alpha');
        expect(workout.lifts[0].liftType.name).to.equal('alpha');
        expect(workout.lifts[0].repLabel).to.equal('reps');
        expect(workout.lifts[0].weightLabel).to.equal('weight');

        expect(workout.lifts[1].name).to.equal('beta');
        expect(workout.lifts[1].liftType.name).to.equal('beta');
        expect(workout.lifts[1].repLabel).to.equal('time');
        expect(workout.lifts[1].weightLabel).to.equal('res.');

        expect(workout.lifts[2].name).to.equal(undefined);
        expect(workout.lifts[2].liftType.name).to.equal(undefined);
        expect(workout.lifts[2].repLabel).to.equal('reps');
        expect(workout.lifts[2].weightLabel).to.equal('weight');
    });

    it('selectedWorkoutSetSelector returns null if no selectedWorkout',()=>{
        const initialState:any = {};

        const workoutSet = selectedWorkoutSetSelector(initialState);
        expect(workoutSet).to.equal(null);
    });

    it('selectedWorkoutSetSelector returns null if no selectedWorkoutSet',()=>{
        const initialState:any = {
            selectedWorkout:{
                workout:{
                    lifts:[
                        {liftTypeKey:'a'},
                        {liftTypeKey:'b'},
                        {liftTypeKey:'c'}
                    ]
                }
            }
        };

        const workoutSet = selectedWorkoutSetSelector(initialState);
        expect(workoutSet).to.equal(null);
    });

    it('selectedWorkoutSetSelector returns selectedWorkoutSet',()=>{
        const initialState:any = {
            selectedWorkout:{
                workoutSet:{
                    weight:20,
                    reps:10
                }
            }
        };

        const workoutSet = selectedWorkoutSetSelector(initialState);
        expect(workoutSet.weight).to.equal(20);
        expect(workoutSet.reps).to.equal(10);
    });
});

