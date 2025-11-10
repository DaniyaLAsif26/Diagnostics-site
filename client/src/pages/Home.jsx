import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';

import SliderCont from '../components/Slider/Slider-cont.jsx';
import PopularPackCont from '../components/Popular-packs/Popular-pack-cont.jsx';
import PopularTestCont from '../components/Popular-tests/Popular-test-cont.jsx';
import RelevanceCont from '../components/Relevance/Relevance-cont.jsx';
import ChooseUsCont from '../components/Choose-us/Choose-us-cont.jsx';
import SampleGuide from "../components/Sample-Guide/Sample-guide.jsx";
import OfferText from "../components/Offer-text/Offer-text.jsx";


export default function Home() {

  const navigate = useNavigate();

  const [hide, setHide] = useState(window.innerWidth >= 786);

  useEffect(() => {
    const handleResize = () => {
      setHide(window.innerWidth <= 786)
    }

    handleResize()
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  })

  const handleRelevanceClick = (relevance) => {
    navigate(`/relevance/${relevance}`);
  };

  const handlePackClick = (pack) => {
    navigate(`/health-packages/${pack.name}`);
  }

  return (
    <>
      <Helmet>
        <title>Book Radiology Scans & Lab Tests Online at Vision Diagnostic Centre</title>
        <meta name="description" content="Browse our comprehensive laboratory tests" />
      </Helmet>
      <SliderCont />
      <OfferText />

      {!hide &&
        <RelevanceCont onRelevanceClick={handleRelevanceClick} />
      }
      <PopularPackCont onPackClick={handlePackClick} />
      {!hide ?
        <SampleGuide />
        :
        <RelevanceCont onRelevanceClick={handleRelevanceClick} />
      }
      <PopularTestCont />
      <ChooseUsCont />
    </>
  );
}
