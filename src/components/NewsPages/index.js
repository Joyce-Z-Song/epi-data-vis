import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style.modules.css";
import axios from "axios";
// "id": 183658,
//           "pubDate": 1647824477000,
//           "pubDateStr": "22小时前",
//           "title": "国家卫健委|昨日新增本土确诊病例1947例",
//           "summary": "3月20日0—24时，31个省（自治区、直辖市）和新疆生产建设兵团报告新增确诊病例2027例。其中境外输入病例80例（湖南18例，上海17例，广西15例，广东7例，福建6例，北京4例，天津4例，黑龙江3例，山东3例，四川2例，浙江1例），含23例由无症状感染者转为确诊病例（湖南18例，广东2例，天津1例，浙江1例，四川1例）；本土病例1947例（吉林1542例，其中长春市1079例、吉林市452例",
//           "infoSource": "央视新闻app",
//           "sourceUrl"
function getDate(Datastr) {
  let oDate = new Date(Datastr);
  let oYear = oDate.getFullYear();
  let oMonth = oDate.getMonth() + 1;
  let oDay = oDate.getDate();
  let oHour = oDate.getHours();
  let oMin = oDate.getMinutes();
  return oYear + "年" + oMonth + "月" + oDay + "日" + " " + oHour + ":" + oMin;
}

function News({
  id,
  pubDate,
  pubDateStr,
  title,
  summary,
  infoSource,
  sourceUrl,
}) {
  //pubDate = new Date(pubDate);
  //console.log(getDate(pubDate));

  return (
    <div className="newsbox">
      <div className="left">
        <div className="line"></div>
        <span className="radius"></span>
      </div>
      <div className="newsitem">
        <div className="pub">
          <p>
            {getDate(pubDate)}({pubDateStr})
          </p>
        </div>
        <div className="card">
          <h1>{title}</h1>
          <div className="cardbody">
            <div className="">
              <p>{summary}</p>
            </div>
            <div className="footer">
              <p onClick={() => openUrl(sourceUrl)}>
                来源：<span>{infoSource}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const openUrl = (url) => {
  const w = window.open("about:blank");
  w.location.href = url;
};

function NewsPage() {
  const [data, setData] = useState({ hits: [] });
  let datas = {
    code: 200,
    msg: "success",
    newslist: [
      {
        news: [
          {
            id: 184444,
            pubDate: 1648176223000,
            pubDateStr: "4小时前",
            title: "国家卫健委|昨日新增本土确诊病例1301例",
            summary: "截至3月24日24时新型冠状病毒肺炎疫情最新情况",
            infoSource: "央视新闻",
            sourceUrl: "",
          },
          {
            id: 184431,
            pubDate: 1648169102000,
            pubDateStr: "6小时前",
            title: "吉林|昨日新增本土确诊病例1110例",
            summary:
              "3月24日0-24时，吉林全省新增本地确诊病例1110例(轻型1099例、普通型11例），其中长春市576例（含68例无症状感染者转为确诊病例）、吉林市528例（含23例无症状感染者转为确诊病例）、四平市6例；新增本地无症状感染者900例，其中吉林市608例、长春市290例、延边州2例。以上感染者均已转运至定点医疗机构隔离治疗，对以上人员的密切接触者、次密切接触者均已开展追踪排查，并落实管控措施，",
            infoSource: "央视新闻app",
            sourceUrl:
              "https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=11214914690619233595&toc_style_id=feeds_default",
          },
          {
            id: 184434,
            pubDate: 1648170079000,
            pubDateStr: "6小时前",
            title: "天津|昨日新增本土确诊病例25例",
            summary:
              "2022年3月24日0—24时，天津市新增25例本土新冠肺炎确诊病例（含3例无症状感染者转为确诊病例）。无新增境外输入新冠肺炎确诊病例。新增42例本土无症状感染者，新增2例境外输入无症状感染者。治愈出院46人（其中本土病例36人，境外输入病例10人）。\n自2022年2月24日至3月24日，天津市累计报告本土新冠肺炎确诊病例533例，在院治疗369人，治愈出院164人。累计报告本土无症状感染者209",
            infoSource: "央视新闻app",
            sourceUrl:
              "https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=13672276336333978867&toc_style_id=feeds_default",
          },
          {
            id: 184423,
            pubDate: 1648167156000,
            pubDateStr: "6小时前",
            title: "河北|昨日新增本土确诊病例24例",
            summary:
              "据河北省卫健委消息，2022年3月24日0—24时，河北省新增本土新型冠状病毒肺炎确诊病例24例，其中廊坊市23例、定州市1例（系外省途经定州高速服务区的协查人员）；新增本土无症状感染者288例，其中廊坊市229例、唐山市59例。治愈出院11例，无症状感染者解除医学观察10例。\n截至3月24日24时，河北省现有本土确诊病例344例；尚在医学观察本土无症状感染者2952例。\n（总台记者郭晓平王帅",
            infoSource: "央视新闻app",
            sourceUrl:
              "https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=2850231725306858134&toc_style_id=feeds_default",
          },
          {
            id: 184424,
            pubDate: 1648166839000,
            pubDateStr: "6小时前",
            title: "辽宁|昨日本土确诊病例9例",
            summary:
              "3月24日0—24时，辽宁省新增9例本土新冠肺炎确诊病例，其中沈阳市报告3例（含1例由无症状感染者转为确诊病例）、大连市报告2例、营口市报告2例（含1例由无症状感染者转为确诊病例）、辽阳市报告1例、葫芦岛市报告1例（由无症状感染者转为确诊病例）；新增180例本土无症状感染者，其中沈阳市报告95例、大连市报告31例、锦州市报告2例、营口市报告50例、辽阳市报告2例；新增2例境外输入无症状感染者，分别",
            infoSource: "央视新闻app",
            sourceUrl:
              "https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=7098962386355499936&toc_style_id=feeds_default",
          },
        ],
      },
    ],
  };
  let newsList = [];
  useEffect(async () => {
    const result = await axios(
      "http://api.tianapi.com/txapi/ncov/index?key=da7a4ccc481b8943b0f26361a2d6fd30"
    );
    console.log("1111", result.data);
    if (result.data.code == 200) setData(result.data);
    else {
      result.data = datas;
      setData(result.data);
    }
  }, []);
  if (data.code == 200) {
    newsList = data.newslist[0].news;
  }

  return (
    <div>
      {newsList.map((news) => (
        <News {...news} key={news.id}></News>
      ))}
    </div>
  );
}
export default NewsPage;
