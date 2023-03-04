// Write your JavaScript code here!

// const { addDestinationInfo } = require("./scriptHelper");

// const { pickPlanet } = require('./scriptHelper');

// const { myFetch } = require('./scriptHelper');

// const { formSubmission } = require('./scriptHelper');

window.addEventListener('load', function () {
  let form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    let pilotInput = document.querySelector('input[name=pilotName]');
    let copilotInput = document.querySelector('input[name=copilotName]');
    let fuelLevelInput = document.querySelector('input[name=fuelLevel]');
    let cargoMassInput = document.querySelector('input[name=cargoMass]');
    if (
      pilotInput.value === '' ||
      copilotInput.value === '' ||
      fuelLevelInput.value === '' ||
      cargoMassInput.value === ''
    ) {
      alert('All fields are required!');
      event.preventDefault();
    } else {
      formSubmission(
        document,
        pilotInput.value,
        copilotInput.value,
        fuelLevelInput.value,
        cargoMassInput.value
      );
      event.preventDefault();
    }
  });
  let listedPlanets;
  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse
    .then(function (result) {
      listedPlanets = result;
      console.log(listedPlanets);
    })
    .then(function () {
      console.log(listedPlanets);
      // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
      let chosenPlanet = pickPlanet(listedPlanets);
      addDestinationInfo(
        document,
        chosenPlanet.name,
        chosenPlanet.diameter,
        chosenPlanet.star,
        chosenPlanet.distance,
        chosenPlanet.moons,
        chosenPlanet.image
      );
    });
});
