import React from "react";
import styles from "./RumorItem.module.css"; //不生效

export type RumorInfo = {
    id?: string;
    date?: string;
    title?: string;
    explain?: string;
    imgsrc?: string;
    result?: string;
    url?: string;
    desc?: string;
    tag?: string;
    author?: string;
};

const RumorItem: React.FC<RumorInfo> = (props) => {
    return (
        <div className={styles.cotainer}>
            {/* <div>{rumor?.id}</div> */}
            <div className={styles.imgBox}>
                <img
                    src={props?.imgsrc}
                    alt="loading failed"
                    className={styles.img}
                />
                <div className={styles.circle}>
                    <span className={styles.explain}>{props?.explain}</span>
                    <span className={styles.result}>{props?.result}</span>
                </div>
            </div>
            <div className={styles.contenBox}>
                <div className={styles.title}>
                    {props?.title}
                    <a href={props?.url}>...</a>
                </div>
                <div className={styles.desc}>{props?.desc}</div>
                {/* <div>{rumor?.tag}</div> */}
                <div className={styles.author}>
                    <span>——{props?.date},</span>
                    <span>{props?.author}</span>
                </div>
            </div>
        </div>
    );
};

export default RumorItem;
