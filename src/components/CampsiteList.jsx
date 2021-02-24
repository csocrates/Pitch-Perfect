import CampsiteCard from "./CampsiteCard";

const CampsiteList = ({ isLoading, campsiteList }) => {
  if (isLoading) return "Loading";

  return (
    <>
      <div>
        {campsiteList.map((campsite) => {
          return <CampsiteCard key={campsite.reference} campsite={campsite} />;
        })}
      </div>
    </>
  );
};

export default CampsiteList;
