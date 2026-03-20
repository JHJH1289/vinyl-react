import { useEffect, useRef } from "react";
import "./VenueMap.css";

function VenueMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = async () => {
      if (!window.google || !window.google.maps) return;

      const venuePosition = {
        lat: 35.136424,
        lng: 129.101948,
      };

      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } =
        await window.google.maps.importLibrary("marker");

      const map = new Map(mapRef.current, {
        center: venuePosition,
        zoom: 17,
        mapId: "DEMO_MAP_ID",
      });

      new AdvancedMarkerElement({
        map,
        position: venuePosition,
        title: "더바이널 언더그라운드라이브클럽",
      });
    };

    loadMap();
  }, []);

  return (
    <section className="venue-map-section">
      <div className="venue-map-container">
        <h2 className="venue-map-title">오시는 길</h2>
        <p className="venue-map-name">더바이널 언더그라운드라이브클럽</p>
        <p className="venue-map-address">부산광역시 남구 수영로322번길 32</p>
        <div ref={mapRef} className="venue-map-box" />
      </div>
    </section>
  );
}

export default VenueMap;