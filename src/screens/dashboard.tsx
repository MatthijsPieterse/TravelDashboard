import MapComponent from "../components/mapComponent/map";

const Home = () => {
  return (
    <div className="h-screen grid grid-cols-4 grid-rows-3 gap-4 p-4">
      {/* Clock */}
      <div className="col-span-1 row-span-1 p-2"></div>

      {/* Map */}
      <div className="col-span-2 row-span-2 border">
        <MapComponent defaultCenter={[20, 10]} defaultZoom={2} />
      </div>

      {/* Stats */}
      <div className="col-span-1 row-span-1 p-2">
      </div>

      {/* Navigation */}
      <div className="col-span-1 row-span-2 p-2"></div>
    </div>
  );
};

export default Home;
