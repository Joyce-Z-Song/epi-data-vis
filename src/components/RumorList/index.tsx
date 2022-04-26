import React, { useEffect, useState } from "react";
import RumorItem, { RumorInfo } from "./RumorItem/RumorItem";
import { getRumors } from "../../services/rumors/api";

const RumorList: React.FC = () => {
  const [rumorList, setRumorList] = useState<RumorInfo[]>();
  useEffect(() => {
    getRumors().then((result) => {
      if (result?.code === 200) {
        setRumorList(result?.newslist);
      }
    });
  }, []);
  return (
    <div className="news-list">
      {rumorList?.map((rumor) => (
        <RumorItem {...rumor} key={rumor?.id} />
      ))}
    </div>
  );
};

export default RumorList;
