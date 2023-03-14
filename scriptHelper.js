// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  let missionTarget = document.getElementById('missionTarget');
  missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src='${imageUrl}'>
                `;
}

// function alertValidation() {
//   let pilotInput = document.querySelector('input[name=pilotName]');
//   let copilotInput = document.querySelector('input[name=copilotName]');
//   let fuelLevelInput = document.querySelector('input[name=fuelLevel]');
//   let cargoMassInput = document.querySelector('input[name=cargoMass]');
//   if (
//     pilotInput.value === '' ||
//     copilotInput.value === '' ||
//     fuelLevelInput.value === '' ||
//     cargoMassInput.value === ''
//   ) {
//     alert('All fields are required!');
//     event.preventDefault();
//   }
// }

function validateInput(testInput) {
  if (testInput === '') {
    return 'Empty';
  } else if (isNaN(testInput)) {
    return 'Not a Number';
  } else if (!isNaN(testInput)) {
    return 'Is a Number';
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  if (
    validateInput(pilot) === 'Is a Number' ||
    validateInput(copilot) === 'Is a Number' ||
    validateInput(fuelLevel) === 'Not a Number' ||
    validateInput(cargoLevel) === 'Not a Number'
  ) {
    alert('Make sure to enter valid information for each field!');
  } else {
    let faultyItems = document.getElementById('faultyItems');
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let launchStatus = document.getElementById('launchStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;
    copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`;
    if (fuelLevel < 10000) {
      fuelStatus.textContent = 'Fuel level too low for launch';
      launchStatus.textContent = 'Shuttle Not Ready for Launch';
      launchStatus.style.color = '#C7254E';
    } else if (fuelLevel >= 10000) {
      fuelStatus.textContent = 'Fuel level high enough for launch';
    }
    if (cargoLevel > 10000) {
      cargoStatus.textContent = 'Cargo mass too heavy for launch';
      launchStatus.textContent = 'Shuttle Not Ready for Launch';
      launchStatus.style.color = '#C7254E';
    } else if (cargoLevel <= 10000) {
      cargoStatus.textContent = 'Cargo mass low enough for launch';
    }
    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
      fuelStatus.textContent = 'Fuel level high enough for launch';
      cargoStatus.textContent = 'Cargo mass low enough for launch';
      launchStatus.textContent = 'Shuttle is Ready for Launch';
      launchStatus.style.color = '#419f6a';
    }
    faultyItems.style.visibility = 'visible';
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    'https://handlers.education.launchcode.org/static/planets.json'
  ).then(function (response) {
    return response.json();
  });
  return planetsReturned;
}

function pickPlanet(planets) {
  let randomPlanetIndex = Math.floor(Math.random() * planets.length);
  return planets[randomPlanetIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
