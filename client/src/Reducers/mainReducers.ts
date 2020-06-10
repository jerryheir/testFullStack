import * as actionTypes from '../Actions/types';

const initialState = {
    loading: true,
    downloads: [],
    processing: [],
    pending: []
};

export default function (state = initialState, action: any) {
    const {type, payload} = action;
    switch (type) {
        case actionTypes.GET_DOWNLOADS: {
            return {
                ...state,
                loading: false,
                downloads: payload,
                processing: payload.filter((val: any)=>val.status !== "pending"),
                pending: payload.filter((val: any)=>val.status === "pending")
            }
        }
        case actionTypes.ADD_DOWNLOADS: {
            return {
                ...state,
                downloads: [...state.downloads, payload],
                pending: [...state.pending, payload]
            }
        }
        case actionTypes.DELETE_DOWNLOADS: {
            return {
                ...state,
                downloads: state.downloads.filter((val: any)=>val.id !== payload),
                processing: state.processing.filter((val: any)=>val.id !== payload)
            }
        }
        default:
            return state;
    }
}
