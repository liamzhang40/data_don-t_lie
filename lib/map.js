import mapStyle from './map_style';

// const initMap = () => {
//   const mapEl = document.getElementById('map');
//   const mapOptions = {
//       center: { lat: 38.09024, lng: -95.712891 },
//       zoom: 5,
//       styles: mapStyle,
//       mapTypeControl: false,
//       fullscreenControl: false,
//       streetViewControl: false
//   };
//
//   const map = new google.maps.Map(mapEl, mapOptions);
//
//   return map;
// };

const initMap = () => {
  const svg = d3.select("svg");
  const path = d3.geoPath(null);

  d3.json("https://d3js.org/us-10m.v1.json").then(us => {
    const usData = topojson.feature(us, us.objects.states).features;
    d3.tsv("https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/us-state-names.tsv")
    .then(stateNames => {
      const nameHash = {};
      stateNames.forEach(name => {
        nameHash[name.id] = name.name;
      });

      svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(usData)
        .enter().append("path")
        .attr("d", path)
        .attr("id", datum => datum.id);

      svg.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => { return a !== b; })));

      svg.append("g")
        .attr("class", "state-names")
        .selectAll("text")
        .data(usData)
        .enter().append("text")
        .text(datum => {
          if (datum.id[0] === "0") {
            return nameHash[datum.id[1]];
          } else {
            return nameHash[datum.id];
          }
        })
        .attr("x", datum => path.centroid(datum)[0])
        .attr("y", datum => path.centroid(datum)[1])
        .attr("text-anchor", "middle")
        .attr("fill", "#6f9ba5");

      });
  });
};

export default initMap;