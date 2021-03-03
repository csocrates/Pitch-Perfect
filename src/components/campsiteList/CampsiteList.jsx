import CampsiteCard from "./CampsiteCard";
import "./campsiteCard.css";
import "../../App.css";
import relaxedGoose from "../../Images/relaxed-goose.png";
import ClipLoader from "react-spinners/ClipLoader";

const CampsiteList = ({ isListLoading, campsiteList, searchLocation }) => {
  if (isListLoading) return <ClipLoader />;
  if (searchLocation && campsiteList.length === 0)
    return (
      <div>
        <p className="no-campsites-text">
          Sorry, there are no campsites in this area...
        </p>
        <img
          className="no-campsites-pic"
          src={relaxedGoose}
          alt="sad duckling"
          style={{ width: "200px", height: "auto" }}
        />
      </div>
    );

  return (
    <>
      <div className="campsiteList">
        {campsiteList.map((campsite) => {
          return <CampsiteCard key={campsite.reference} campsite={campsite} />;
        })}
      </div>
    </>
  );
};

export default CampsiteList;
