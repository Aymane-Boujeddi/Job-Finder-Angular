import { FavoriteOffer } from "../../../core/models/favorite.model";

export interface FavoriteState {
    favorites : FavoriteOffer[];
    isLoading : false;
    error : string | null;
}

export const initialeFavoriteState : FavoriteState  = {
    favorites : [] ,
    isLoading : false,
    error : null,
}

export const favoriteStoreKey = "FavoriteStore";
