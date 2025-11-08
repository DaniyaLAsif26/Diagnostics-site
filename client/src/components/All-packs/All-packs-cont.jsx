import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Popular from "../Popular-packs/Popular.jsx";
import RelevanceCont from "../Relevance/Relevance-cont.jsx";
import "../Popular-packs/PopularCont.css";
import "../Search-results/SearchResults.css";

export default function AllPacksCont({ onPackClick }) {
  const [packs, setPacks] = useState([]);
  const [selectedRelevance, setSelectedRelevance] = useState("");
  const [filteredPacks, setFilteredPacks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchAllPacks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/all-packages");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setPacks(data);
        setFilteredPacks(data);
      } catch (error) {
        console.error("Error fetching all packs:", error);
      }
    };

    fetchAllPacks();
  }, []);

  useEffect(() => {
    setSelectedRelevance("");
    setFilteredPacks(packs);
  }, [location.key, packs]);

  const handleRelevanceClick = (relevance) => {
    if (relevance === selectedRelevance) {
      setSelectedRelevance("");
      setFilteredPacks(packs);
    }
    else {
      setSelectedRelevance(relevance);
      const filtered = packs.filter(
        (pack) => {
          return Array.isArray(pack.relevance) && pack.relevance.includes(relevance)
        }
      );
      console.log("Filtered Packs:", filtered);
      setFilteredPacks(filtered);
    }
  };

  return (
    <div className="all-tests all-packs">
      <div className="">
        <RelevanceCont
          selected={selectedRelevance}
          onRelevanceClick={handleRelevanceClick}
        />
      </div>

      <div className="search-tests-cont">

        {filteredPacks.length > 0 ? (
          <>
            <div className="search-heading">
              <h1>{selectedRelevance ? `'${selectedRelevance}' Packs` : "All Health Packages"}</h1>
            </div>
            <div className="search-tests search-packs">
              {filteredPacks.map((pack) => (
                <Popular
                  key={pack._id || pack.name}
                  name={pack.name}
                  price={pack.price}
                  tests={pack.tests}
                  onClick={onPackClick}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="no-tests">
            <h2>No Health Packages available for the selected relevance.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
