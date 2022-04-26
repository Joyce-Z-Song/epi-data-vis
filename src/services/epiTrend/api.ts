import { clearScreenDown } from "readline";
import {reqNewinfo } from "../../api";
import requests from "../../api/requests";
export async function getEpiData(date: string) {    
    const res = await requests(`http://api.tianapi.com/txapi/ncov/index?key=da7a4ccc481b8943b0f26361a2d6fd30&date=${date}`);
    return res
}