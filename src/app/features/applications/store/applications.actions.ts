import { createAction, props } from "@ngrx/store";
import { Application } from "../../../core/models/application.model";


export const loadApplications = createAction('[Applications] Load Applications');

export const loadApplicationsSuccess = createAction('[Applications] Load Applications Success',props<({applications : Application[]})>());

export const loadApplicationsFailure = createAction('[Applications] Load Applications Failure',props<({error : string})>());


export const addApplication = createAction('[Application] Add Application',props<({application : Application})>());

export const addApplicationSuccess = createAction('[Application] Add Application Success',props<({application : Application})>());

export const addApplicationFailure = createAction('[Application] Add Application Failure',props<({error : string})>());

export const removeApplication = createAction('[Application] Remove Application' , props<({id : number})>());

export const removeApplicationSuccess = createAction('[Application] Remove Application Success' , props<({id : number})>());

export const removeApplicationFailure = createAction('[Application] Remove Application Failure' , props<({error : string})>());

export const updateApplication = createAction('[Application] Update Application' , props<({id : number , changes : Partial<Application>})>());

export const updateApplicationSuccess = createAction('[Application] Update Application Success' , props<({application : Application})>());

export const updateApplicationFailure = createAction('[Application] Update Application Failure' , props<({error : string})>());


