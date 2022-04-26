//先引入mockjs模块
import Mock from 'mockjs';

import china from './china.json';
import newincrease from './newincrease.json';
import newinfo from './newinfo.json';


Mock.mock("/mock/china",{code:200,data:china});
Mock.mock("/mock/newincrease",{code:200,data:newincrease});
Mock.mock("/mock/newinfo", newinfo);
