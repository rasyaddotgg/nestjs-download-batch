// https://63aafbf8cf281dba8c1697c5.mockapi.io/aryaapi/persons

import axiosInstance from "src/utils/axios";

export function load(params: any){
    return axiosInstance.get('/persons',{
        "params": params
    });
}

export function save(body: any){
    return axiosInstance.post('/persons',body);
}