import { Routes, Route } from "react-router-dom";
import DtmApply from "../pages/dtm/DtmApply";
import DtmList from "../pages/dtm/DtmList";
import GetListTemp from "../sample/GetListTemp";
import SamplePage2 from "../sample/layout2/SamplePage2";
import SamplePage3 from "../sample/layout3/SamplePage3";
import SamplePage3_1 from "../sample/layout3_1/SamplePage3_1";
import SamplePage4 from "../sample/layout4/SamplePage4";
import SamplePage5 from "../sample/layout5/SamplePage5";
import SettingComponent from "../sample/SettingComponent";
import PhmBase from "../pages/phm/PhmBase";
import TabTemp from "../sample/TabTemp";
import TypoText from "./TypoText";

export default function PageRoutes() {
  // 오픈되는 페이지들을 정의한다.
  return (
    <Routes>
      <Route path="/" element={<TypoText />} />
      <Route path="/DtmList" element={<DtmList />} />
      <Route path="/DtmApply" element={<DtmApply />} />
      <Route path="/GetListTemp" element={<GetListTemp />} />
      <Route path="/TabTemp" element={<TabTemp />} />
      <Route path="/SamplePage2" element={<SamplePage2 />} />
      <Route path="/SamplePage3" element={<SamplePage3 />} />
      <Route path="/SamplePage3_1" element={<SamplePage3_1 />} />
      <Route path="/SamplePage4" element={<SamplePage4 />} />
      <Route path="/SamplePage5" element={<SamplePage5 />} />
      <Route path="/SettingComponent" element={<SettingComponent />} />
      <Route path="/PhmBase" element={<PhmBase />} />
      {/* <Route path="/Home1" element={<Home1 />} />
      <Route path="/Home2" element={<Home2 />} />
      <Route path="/Home3" element={<Home3 />} />
      <Route path="/IBGridTest" element={<IBGridTest />} />
      <Route path="/DialogTest" element={<DialogTest />} />

      <Route path="/Dtm_Apply" element={<Dtm_Apply />} />
      <Route path="/DtmList" element={<DtmList />} /> */}
    </Routes>
  );
}
