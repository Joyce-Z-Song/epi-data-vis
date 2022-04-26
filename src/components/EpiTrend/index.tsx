import React, { useEffect, useRef, useState } from "react";
import LineChart, { ChartData } from "./LineChart/LineChart";
import { getEpiData } from "../../services/epiTrend/api";
import { clearScreenDown } from "readline";

const EpiTrend = () => {
    const [chartOne, setChartOne] = useState<ChartData[]>([]);
    const [chartTwo, setChartTwo] = useState<ChartData[]>([]);
    const dayNumber = useRef<number>(7);

    const getDateList = (): string[] => {
        let dateList: string[] = [];
        let date: Date = new Date();
        for (let i = 1; i <= dayNumber.current; i++) {
            dateList.push(
                date.getFullYear() +
                    "-" +
                    (date.getMonth() + 1 < 10
                        ? "0" + (date.getMonth() + 1)
                        : date.getMonth() + 1) +
                    "-" +
                    (date.getDate() < 10
                        ? "0" + date.getDate()
                        : date.getDate())
            );
            date = new Date(date.getTime() - 1000 * 60 * 60 * 24);
        }
        return dateList.reverse();
    };

    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const fetchData = async () => {
            const dateList: string[] = getDateList(); // dateList = ['2022-03-24','2022-03-23'...]

            let tmpChart1: ChartData[] = [];
            let tmpChart2: ChartData[] = [];

            async function getEpiDataByDate() {
                for (let i = 0; i < dateList.length; i++) {
                    const data: any = await getEpiData(dateList[i]);
                    console.log(data);
                    if (data?.code === 200) {
                        tmpChart1.push({
                            X: dateList[i].slice(5),
                            Y: data.newslist[0].desc.currentConfirmedCount,
                            dataType: "现存确诊人数",
                        });
                        tmpChart1.push({
                            X: dateList[i].slice(5),
                            Y: data.newslist[0].desc.seriousCount,
                            dataType: "现存无症状人数",
                        });
                        tmpChart2.push({
                            X: dateList[i].slice(5),
                            Y: data.newslist[0].desc.highDangerCount,
                            dataType: "国内高风险地区个数",
                        });
                        tmpChart2.push({
                            X: dateList[i].slice(5),
                            Y: data.newslist[0].desc.midDangerCount,
                            dataType: "国内中风险地区个数",
                        });
                    }
                    await sleep(1000);
                }
            }

            await getEpiDataByDate();

            console.log(tmpChart1);
            console.log(tmpChart2);

            setChartOne(tmpChart1);
            setChartTwo(tmpChart2);
        };

        fetchData();

        // Promise.all(dateList.map((date) => getEpiData(date)))
        //   .then((values) => {
        //     let tmpChart1: ChartData[] = [];
        //     let tmpChart2: ChartData[] = [];
        //     values.map((value: any, i) => {
        //       if (value.code !== 200) {
        //         console.log(
        //           "获取失败，日期:",
        //           dateList[i],
        //           "错误代码:",
        //           value.code
        //         );
        //         return "";
        //       }
        //       tmpChart1.push({
        //         X: dateList[i],
        //         Y: value.newslist[0].desc.currentConfirmedCount,
        //         dataType: "现存确诊人数",
        //       });
        //       tmpChart1.push({
        //         X: dateList[i],
        //         Y: value.newslist[0].desc.seriousCount,
        //         dataType: "现存无症状人数",
        //       });
        //       tmpChart2.push({
        //         X: dateList[i],
        //         Y: value.newslist[0].desc.highDangerCount,
        //         dataType: "国内高风险地区个数",
        //       });
        //       tmpChart2.push({
        //         X: dateList[i],
        //         Y: value.newslist[0].desc.midDangerCount,
        //         dataType: "国内中风险地区个数",
        //       });
        //     });
        //     return [tmpChart1, tmpChart2];
        //   })
        //   .then(([tmpChart1, tmpChart2]) => {
        //     console.log(tmpChart1);
        //     console.log(tmpChart2);
        //     setChartOne(tmpChart1);
        //     setChartTwo(tmpChart2);
        //   });
    }, []);

    return (
        <div className="epi-trend">
            <LineChart data={chartOne} chartId="chartOne" />
            <LineChart data={chartTwo} chartId="chartTwo" />
        </div>
    );
};

export default EpiTrend;
