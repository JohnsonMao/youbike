import React from "react";
import Lottie from "lottie-react-web";

import youbike from "../../asset/icon/youbike.json";

export default function Loading() {
  return (
    <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center">
      <div>
        <Lottie
          options={{
            animationData: youbike,
          }}
        />
      </div>
    </div>
  );
}
