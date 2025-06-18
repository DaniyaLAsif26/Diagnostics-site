import { useNavigate } from "react-router-dom";
import SliderCont from '../components/Slider/Slider-cont.jsx';
import PopularPackCont from '../components/Popular-packs/Popular-pack-cont.jsx';
import PopularTestCont from '../components/Popular-tests/Popular-test-cont.jsx';
import RelevanceCont from '../components/Relevance/Relevance-cont.jsx';
import ChooseUsCont from '../components/Choose-us/Choose-us-cont.jsx';

export default function Home() {

  const navigate = useNavigate();

  const handleRelevanceClick = (relevance) => {
    navigate(`/relevance/${relevance}`);
  };

  const handlePackClick = (pack) => {
    navigate(`/health-packages/${pack.name}`);
  }

  return (
    <>
      <SliderCont />
      <PopularPackCont onPackClick ={handlePackClick}/>
      <RelevanceCont onRelevanceClick={handleRelevanceClick} />
      <PopularTestCont/>
      <ChooseUsCont />
    </>
  );
}
