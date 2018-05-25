import initMap from './map';
import updateInstances from './update_instances';

document.addEventListener('DOMContentLoaded', () => {

  let latLng = {};
  let instances;
  let sales;
  initMap();

  d3.json("https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json").then(cities => {
    cities.forEach(city => latLng[city.city] = {latitude: city.latitude, longitude: city.longitude});


    d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/merge.csv").then(data => {
      instances = data;
      setTimeout(() => updateInstances(data, latLng), 100);
    });

    d3.csv("https://raw.githubusercontent.com/liamzhang40/nothing_political/master/csv/nics_firearm_background_checks.csv", data => {
      window.sales = data;
    });
  });

  document.getElementById('year-options').addEventListener('change', (e) => {
    let year = e.currentTarget.value;
    year = year.slice(year.length - 2);
    const selected_instances = instances.filter(instance => {
      let date = instance.date;
      date = date.slice(date.length - 2);
      return date === year;
    });
    updateInstances(selected_instances, latLng);
  });


});