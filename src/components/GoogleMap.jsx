import React from "react";

export default function GoogleMap({ latitude, longitude }) {

  return (

    <iframe

      title="Business Location"

      width="100%"

      height="350"

      loading="lazy"

      style={{

        border:0,

        borderRadius:"20px"

      }}

      src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}

    />

  );

}