import React, { useRef, useState, Ref } from "react";
import { Tabs, Swiper } from "antd-mobile";
import { SwiperRef } from "antd-mobile/es/components/swiper";
import MapPosition from "../../components/MapPosition";
import RumorList from "../../components/RumorList";
import EpiTrend from "../../components/EpiTrend/";
import NewsPage from "../../components/NewsPages/";
import "../../mock/mockServe.js";
import "./App.css";

const tabItems = [
  { key: "map", title: "疫情地图" },
  { key: "trend", title: "疫情趋势" },
  { key: "newslist", title: "最新消息" },
  { key: "rumor", title: "辟谣信息" },
];

function App() {
  const swiperRef = useRef<SwiperRef>();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="App">
      <div className="topbanner"></div>
      <Tabs
        activeKey={tabItems[activeIndex].key}
        onChange={(key) => {
          const index = tabItems.findIndex((item) => item.key === key);
          setActiveIndex(index);
          swiperRef.current?.swipeTo(index);
        }}
      >
        {tabItems.map((item) => (
          <Tabs.Tab title={item.title} key={item.key} />
        ))}
      </Tabs>
      <Swiper
        direction="horizontal"
        loop
        indicator={() => null}
        ref={swiperRef as Ref<SwiperRef>}
        defaultIndex={activeIndex}
        onIndexChange={(index) => {
          setActiveIndex(index);
        }}
      >
        <Swiper.Item>
          <MapPosition></MapPosition>
        </Swiper.Item>
        <Swiper.Item>
          <EpiTrend />
        </Swiper.Item>
        <Swiper.Item>
          <NewsPage />
        </Swiper.Item>
        <Swiper.Item>
          <RumorList />
        </Swiper.Item>
      </Swiper>
    </div>
  );
}

export default App;
