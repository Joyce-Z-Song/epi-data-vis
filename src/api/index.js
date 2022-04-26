import reqMock from './reqMock';
import requests from './requests';

// Mock数据接口
export const reqChinaGeojson = () => reqMock.get("/china");
export const reqNewincrease = () => reqMock.get("/newincrease");
export const reqNewinfo = () => reqMock.get("/newinfo");

// 真实数据接口
export const reqChinaGeojsonReal = () => requests.get("https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json");
export const reqNewincreaseReal = () => requests.get("http://111.231.75.86:8000/api/provinces/CHN/");
export const reqNewinfoReal = () => requests.get("http://api.tianapi.com/txapi/ncov/index", {params: {key: "da7a4ccc481b8943b0f26361a2d6fd30"}});