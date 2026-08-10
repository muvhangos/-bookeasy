import { useState } from "react";

export default function LocationPicker({ onLocation }) {

  const [loading,setLoading]=useState(false);

  const getLocation=()=>{

    setLoading(true);

    navigator.geolocation.getCurrentPosition(

      (position)=>{

        onLocation({

          latitude:position.coords.latitude,

          longitude:position.coords.longitude

        });

        setLoading(false);

      },

      ()=>{

        alert("Unable to get your location");

        setLoading(false);

      }

    );

  };

  return(

    <button onClick={getLocation}>

      {loading ? "Getting Location..." : "Use Current Location"}

    </button>

  );

}