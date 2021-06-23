import React, { useState, useEffect } from 'react'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

const projection = geoAlbersUsa()
  .translate([ 800 / 2, 450 / 2 ])
  .scale([1000])

const Map = () => {
  const [geographies, setGeographies] = useState([])
  const [statesVisted, setStatesVisted] = useState([]);

  useEffect(() => {
    fetch('/data/states-10m.json')
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(topojsonData => {
            const geoData = feature(topojsonData, topojsonData.objects.states).features
            setGeographies(geoData);
        })
      })
  }, [])

  const onAddState = state => {
    // const index = statesVisted.findIndex(stateVisted => state.id === stateVisted.id)
    setStatesVisted([
      ...statesVisted,
      {
        id: state.id,
        name: state.properties.name,
        visited: true
      }
    ])
  };

  const setFill = data => {
      const index = statesVisted.findIndex(sv => sv.id === data.id)
      if(index > -1) {
        return 'red';
      }
      return 'rgba(123,127,134)';
  };

  return (
    <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
      <g className="states">
        {
          geographies.map((d,i) => (
            <path
              key={ `path-${ i }` }
              d={ geoPath().projection(projection)(d) }
              className="state"
              fill={ setFill(d) }
              onClick={() => onAddState(d)}
            //   fill={ `rgba(69,173,168,${ 1 / geographies.length * i})` }
              stroke="#FFFFFF"
              strokeWidth={ 0.5 }
            />
          ))
        }
      </g>
    </svg>
  )
}

export default Map