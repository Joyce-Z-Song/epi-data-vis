import React, { useEffect, useState } from "react";
import { reqChinaGeojson, reqNewincrease, reqNewinfo } from "../../api";
import {
    reqChinaGeojsonReal,
    reqNewincreaseReal,
    reqNewinfoReal,
} from "../../api";


import { Area} from "@antv/l7plot";
import { Table } from "antd";
import "antd/dist/antd.css";
import styles from "./style.module.css";
import { anchorType, IStatusOptions } from "@antv/l7";
import { ColumnsType } from "antd/lib/table";

type Province = {
    currentConfirmedCount: number;
    provinceName: string;
    provinceCode: string;
}

type Features = {
    properties: {
        name: string;
    }
}

type China = {
    features: Features[]
}

type NewInfo = {
    currentConfirmedCount: number;
    suspectedCount: number;
    curedCount: number;
    deadCount: number;
    currentConfirmedIncr: number;
    suspectedIncr: number;
    curedIncr: number;
    deadIncr: number;
}

const columns: ColumnsType<Province> = [
    {
        title: "省份",
        dataIndex: "provinceName",
        key: "provinceName",
        align: "center",
    },
    {
        title: "现有确诊",
        dataIndex: "currentConfirmedCount",
        key: "currentConfirmedCount",
        align: "center",
    },
    {
        title: "治愈",
        dataIndex: "curedCount",
        key: "curedCount",
        align: "center",
    },
    {
        title: "死亡",
        dataIndex: "deadCount",
        key: "deadCount",
        align: "center",
    },
];

function mergeData(geo: China, increase: Province[]) {
    geo.features.forEach((item) => {
        let info =
            increase.find(
                (i) => item.properties.name.search(i.provinceName) !== -1
            ) || {};
        item.properties = { ...item.properties, ...info };
    });
}

/** 地图配置 */

const MapPosition = () => {
    let geoJson: China, increase: Province[], desc;
    const [geoJsonState, setGeoJson] = useState<China>();
    const [increaseState, setIncrease] = useState<Province[]>();
    const [newinfoState, setNewinfo] = useState<NewInfo>();
    const draw = async () => {
        // 使用Mock数据
        // let result = await reqChinaGeojson();
        // geoJson = result.data;

        // result = await reqNewincrease();
        // increase = result.data;

        // result = await reqNewinfo();

        // 获取数据
        try {
            // 使用真实数据接口
            let result = await reqChinaGeojsonReal();
            geoJson = result;
            result = await reqNewincreaseReal();
            increase = result;
            result = await reqNewinfoReal();

            desc = result.newslist[0].desc;
            setNewinfo(desc);
            increase.sort(
                (a: Province, b: Province) => b.currentConfirmedCount - a.currentConfirmedCount
            );
            if (geoJson && increase) {
                mergeData(geoJson, increase);
            }
            setGeoJson(geoJson);
            setIncrease(increase);
        } catch (error) {
            // 如果出现接口数据无法访问的异常，使用Mock数据，不至于页面无法显示
            let result = await reqChinaGeojson();
            geoJson = result.data;

            result = await reqNewincrease();
            increase = result.data;

            result = await reqNewinfo();
            desc = result.newslist[0].desc;
            setNewinfo(desc);
            increase.sort(
                (a: Province, b: Province) => b.currentConfirmedCount - a.currentConfirmedCount
            );
            if (geoJson && increase) {
                mergeData(geoJson, increase);
            }
            setGeoJson(geoJson);
            setIncrease(increase);
        }
        
        // 创建地图      
        let area = new Area("map", {
            map: {
                type: "mapbox",
                style: "blank",
                center: [120.19382669582967, 30.258134],
                zoom: 2,
                pitch: 0,
            },
            source: {
                data: geoJson,
                parser: {
                    type: "geojson",
                },
            },
            autoFit: true,
            color: {
                field: "currentConfirmedCount",
                value: ({ currentConfirmedCount }) => {
                    if (currentConfirmedCount === 0) {
                        return "#fff";
                    } else if (currentConfirmedCount <= 10) {
                        return "rgb(255, 192, 177)";
                    } else if (currentConfirmedCount <= 100) {
                        return "rgb(255, 153, 129)";
                    } else if (currentConfirmedCount <= 500) {
                        return "rgb(247, 82, 68)";
                    } else if (currentConfirmedCount <= 1000) {
                        return "rgb(218, 20, 19)";
                    } else {
                        return "rgb(157, 5, 4)";
                    }
                },
            },
            style: {
                opacity: 1,
                stroke: "rgb(93,112,146)",
                lineWidth: 0.6,
                lineOpacity: 1,
            },
            state: {
                select: false,
            },
            label: {
                visible: true,
                field: "name",
                style: {
                    fill: "#000",
                    opacity: 0.8,
                    fontSize: 10,
                    stroke: "#fff",
                    strokeWidth: 1.5,
                    textAllowOverlap: false,
                    padding: [5, 5],
                },
            },
            tooltip: {
                items: [
                    { field: "provinceName", alias: "省份" },
                    { field: "currentConfirmedCount", alias: "现存确诊" },
                ],
                trigger: "click",
                anchor: "center" as anchorType,
                offsets: [-20, 0],
            },
            legend: {
                position: "bottomleft",
                type: "category",
                title: "现存确诊数",
                items: [
                    { id: '0', color: "#fff", value: "0" },
                    { id: '1', color: "rgb(255, 192, 177)", value: "1-10" },
                    { id: '2', color: "rgb(255, 153, 129)", value: "11-100" },
                    { id: '3', color: "rgb(247, 82, 68)", value: "101-500" },
                    { id: '4', color: "rgb(218, 20, 19)", value: "501-1000" },
                    { id: '5', color: "rgb(157, 5, 4)", value: "1000+" },
                ],
            },
        });
        // 设置地图属性
        area.setMapStatus({
          dragEnable: false,
          rotateEnable: false,
          zoomEnable: false,
        } as IStatusOptions);
    };

    useEffect(() => {
        draw();
    }, []);

    return (
        <div>
            <div className={styles.info}>
                <ul className={styles.infoul}>
                    <li className={styles.infoli}>
                        <span className={styles.red}>
                            确诊<br></br>
                            {newinfoState?.currentConfirmedCount}
                            <br></br><span className={styles.yesterday}>较昨日<span className={styles.red}>+{newinfoState?.currentConfirmedIncr}</span></span>
                        </span>
                    </li>
                    <li className={styles.infoli}>
                        <span className={styles.orange}>
                            疑似<br></br>
                            {newinfoState?.suspectedCount}
                            <br></br><span className={styles.yesterday}>较昨日<span className={styles.orange}>+{newinfoState?.suspectedIncr}</span></span>
                        </span>
                    </li>
                    <li className={styles.infoli}>
                    <span className={styles.green}>
                            治愈<br></br>
                            {newinfoState?.curedCount}
                            <br></br><span className={styles.yesterday}>较昨日<span className={styles.green}>+{newinfoState?.curedIncr}</span></span>
                        </span>
                    </li>
                    <li className={styles.infoli}>
                    <span className={styles.gray}>
                            死亡<br></br>
                            {newinfoState?.deadCount}
                            <br></br><span className={styles.yesterday}>较昨日<span className={styles.gray}>+{newinfoState?.deadIncr}</span></span>
                        </span>
                    </li>
                </ul>
            </div>
            <div
                id="map"
                style={{
                    height: "460px",
                    justifyContent: "center",
                    position: "relative",
                }}
            ></div>
            <Table
                columns={columns}
                dataSource={increaseState}
                // pagination={{ position: ["bottomCenter"] }}
                pagination={false}
                rowKey={(record) => record.provinceCode}
            ></Table>
        </div>
    );
};

export default MapPosition;
