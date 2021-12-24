import React, { useCallback } from "react";

import { ReactComponent as GPS } from "../../asset/icon/GPS.svg";

export default function NearbyBtn({ nearby, map, zoom, setPosition, setIndex }) {
  const onClick = useCallback(() => {
    setPosition(nearby.split(','));
    setIndex('noIndex');
    map.setView(nearby.split(','), zoom);
  }, [map, nearby, zoom, setPosition, setIndex]);

  return (
    <button
      type="button"
      className="position-fixed bottom-0 end-0 d-flex flex-column align-items-center btn--dark shadow rounded-circle px-4 py-2 m-8 translate-middle-y"
      onClick={onClick}
    >
      <GPS className="mb-1" />
      <span className="fs-6">附近</span>
    </button>
  );
}
