import { useDashboardStats } from "#features/dashboard/hooks/useDashboardStats.ts";
import MapComponent from "../../map/components/Map.tsx";
import Block from "../../../shared/components/ui/Block.tsx";
import Card from "../../../shared/components/ui/Card.tsx";
import Spinner from "../../../shared/components/ui/Spinner.tsx";
import WorldClock from "../../clock/components/WorldClock.tsx";
import { MapPin } from "lucide-react";

import type { StatCard } from "#features/dashboard/mapping/statCardsMapping";

import {
  mainStatsMapping,
  geoStatsMapping,
  transportationMapping,
  flightMapping,
  culturalMapping,
  tripRecordsMapping,
  personalFavoritesMapping,
} from "#features/dashboard/mapping/statCardsMapping";

const Home = () => {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error loading dashboard: {error.message}
      </div>
    );
  if (!stats) return <Spinner />;

  const renderCards = (config: StatCard[]) =>
    config.map((card, i) => {
      const value = card.getValue(stats);
      return (
        <Card
          key={i}
          color={card.color}
          darkTheme={card.darkTheme}
          icon={card.icon}
          title={card.title}
          value={value}
          subText={card.subtext}
        />
      );
    });

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside className="flex-none w-64 bg-sidebarStart text-white p-4 flex flex-col space-y-4">
        <div className="rounded-full bg-gradient-to-br from-emerald-700 to-emerald-800 p-3 shadow-inner">
          <WorldClock />
        </div>
        {renderCards(mainStatsMapping)}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 text-3xl bg-white p-4">Travel Dashboard</header>

        {/* Content Area */}
        <main className="flex-1 bg-page p-8 space-y-8 overflow-y-auto">
          {/* Map Block */}
          <div className="flex justify-center">
            <section className="rounded-lg overflow-hidden shadow-[0_0px_8px_rgba(0,0,0,0.30)] w-8/10 h-160">
              <MapComponent defaultCenter={[20, 10]} defaultZoom={2} />
            </section>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Geography & Extremes */}
            <Block
              title="Geography & Extremes"
              columns="grid-cols-4"
              width="col-span-2"
            >
              {renderCards(geoStatsMapping)}
            </Block>

            {/* Recent Trips */}
            <Block title="Recent Trips" columns="grid-cols-1">
              <Card
                color="violet"
                icon={MapPin}
                title="Trip to Paris"
                value="5 days"
              />
              <Card
                color="violet"
                icon={MapPin}
                title="Trip to Tokyo"
                value="7 days"
              />
              <Card
                color="violet"
                icon={MapPin}
                title="Trip to New York"
                value="3 days"
              />
            </Block>
          </div>

          {/* Transportation Stats */}
          <div className="grid grid-cols-1 gap-8">
            <Block title="Transportation Stats" columns="grid-cols-7">
              {renderCards(transportationMapping)}
            </Block>
          </div>

          {/* Flight Stats */}
          <div className="grid grid-cols-5 gap-8">
            <Block
              title="Flight Stats"
              columns="grid-cols-2"
              width="col-span-2"
            >
              {renderCards(flightMapping)}
            </Block>

            {/* Cultural Stats */}
            <Block
              title="Cultural Stats"
              columns="grid-cols-4"
              width="col-span-3"
            >
              {renderCards(culturalMapping)}
            </Block>
          </div>

          {/* Trip Records & Personal Favorites */}
          <div className="grid grid-cols-2 gap-8">
            <Block title="Trip Records" columns="grid-cols-2">
              {renderCards(tripRecordsMapping)}
            </Block>

            <Block title="Personal Favorites" columns="grid-cols-2">
              {renderCards(personalFavoritesMapping)}
            </Block>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
