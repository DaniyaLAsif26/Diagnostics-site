import OptionsBar from '../components/options/Options-bar.jsx';
import SliderCont from '../components/Slider/Slider-cont.jsx';
import PopularPackCont from '../components/Popular-packs/Popular-pack-cont.jsx';
import PopularTestCont from '../components/Popular-tests/Popular-test-cont.jsx';
import RelevanceCont from '../components/Relevance/Relevance-cont.jsx';
import ChooseUsCont from '../components/Choose-us/Choose-us-cont.jsx';

export default function Home() {
  return (
    <>
      <OptionsBar />
      <SliderCont />
      <PopularPackCont />
      <RelevanceCont />
      <PopularTestCont />
      <ChooseUsCont />
    </>
  );
}
