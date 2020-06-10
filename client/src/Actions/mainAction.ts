import * as actionType from "./types";
import axios from "../config/axios-orders";
import * as constant from "../config/GlobalConstants.json";
import { store } from "../Store";
import { findWithAttr } from "../Function";

export const getDownloads = () => async (dispatch: any) => {
    try {
        const { data: { items } } = await axios.get(`${constant.Systems.API_VERSION}/downloads`);
        dispatch({
            type: actionType.GET_DOWNLOADS,
            payload: items
        })
    } catch (err){
        console.log(err)
    }
};

export const addDownloads = (body: object) => async (dispatch: any) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data: { staticId, createdAt } } = await axios.post(`${constant.Systems.API_VERSION}/downloads`, body, config);
        dispatch({
            type: actionType.ADD_DOWNLOADS,
            payload: { ...body, id: staticId, status: 'pending', createdAt }
        })
    } catch (err){
        console.log(err)
    }
};

export const deleteDownloads = (id: string) => async (dispatch: any) => {
    try {
        const { data: { success } } = await axios.delete(`${constant.Systems.API_VERSION}/downloads/${id}`);
        if (success){
            dispatch({
                type: actionType.DELETE_DOWNLOADS,
                payload: id
            })
        }
    } catch (err){
        console.log(err)
    }
};

export const progressOrDone = (id: string, progress: boolean, createdAt?: string) => (dispatch: any) => {
    const down = store.getState().main.downloads;
    const status = progress ? "in-progress" : "done";
    if (findWithAttr(down, 'id', id) > -1){
        down[findWithAttr(down, 'id', id)].status = status;
        down[findWithAttr(down, 'id', id)].createdAt = createdAt;
        dispatch({
            type: actionType.GET_DOWNLOADS,
            payload: down
        })
    }
};
