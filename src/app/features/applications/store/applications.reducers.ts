import { createReducer, on } from "@ngrx/store";

import { Application } from "../../../core/models/application.model";
import * as ApplicationActions from "./applications.actions";

export interface ApplicationState {
    applications : Application[];
    isLoading : boolean;
    error : string | null;
}


export const applicationInitialState : ApplicationState = {
    applications : [] ,
    isLoading : false,
    error : null,
}

export const applicationStorekey = "applicationStore";

export const applicationsReducer = createReducer(
    applicationInitialState ,
    on(ApplicationActions.loadApplications, (state) => ({
        ...state ,
        isLoading : true,
    })),
    on(ApplicationActions.loadApplicationsSuccess,(state , {applications}) => ({
        ...state,
        applications,
        isLoading : false ,
        error : null,
    })),
    on(ApplicationActions.loadApplicationsFailure,(state, {error}) => ({
        ...state,
        isLoading : false ,
        error : error,
    })),
    on(ApplicationActions.addApplication , (state , {application}) => ({
        ...state, 
        isLoading : true,
    })),
    on(ApplicationActions.addApplicationSuccess , (state , {application}) => ({
        ...state,
        applications : [...state.applications,application],
        isLoading : false,
        error : null
    })),
    on(ApplicationActions.addApplicationFailure , (state , {error}) => ({
        ...state ,
        error : error ,
        isLoading : false,
    })),
    on(ApplicationActions.removeApplication , (state , {id}) => ({
        ...state,
        isLoading : true
    })),

    on(ApplicationActions.removeApplicationSuccess , (state , {id}) => ({
        ...state,
        applications : state.applications.filter(app => app.id !== id),
        isLoading : false,
        error : null,
    })),
    on(ApplicationActions.removeApplicationFailure , (state , {error}) => ({
        ...state , 
        isLoading : false,
        error : error,
    })),
    on(ApplicationActions.updateApplication , (state , {id , changes}) => ({
        ...state,
        isLoading : true
    })),
    on(ApplicationActions.updateApplicationSuccess , (state , {application}) => ({
        ...state,
        applications : state.applications.map(app => app.id === application.id ? application : app),
        isLoading : false,
        error : null,
    })),
    on(ApplicationActions.updateApplicationFailure , (state , {error}) => ({
        ...state,
        isLoading : false,
        error : error,
    }))
    


);