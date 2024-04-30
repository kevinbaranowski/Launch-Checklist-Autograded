// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    const missionTargetDiv = document.getElementById('missionTarget');
    missionTargetDiv.innerHTML = `
        <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter}</li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
        <img src=${imageUrl}>
    `;
 }
 
 function validateInput(testInput) {
    let convertedInput = Number(testInput);
    if (testInput === '') {
        return 'Empty'
    } else if (isNaN(convertedInput)) {
        return 'Not a Number'
    } else if (!(isNaN(convertedInput))) {
        return 'Is a Number'
    }
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let valResultPilot = validateInput(pilot);
    let valResultCopilot = validateInput(copilot);
    let valResultFuelLevel = validateInput(fuelLevel);
    let valResultCargoLevel = validateInput(cargoLevel);
    try {
        if (valResultPilot === 'Is a Number') {
            throw Error('Pilot Name must contain letters.');
        } else if (valResultCopilot === 'Is a Number') {
            throw Error('Copilot Name must contain letters.')
        } else if (valResultFuelLevel === 'Not a Number') {
            throw Error('Fuel Level must be a number.')
        } else if (valResultCargoLevel === 'Not a Number') {
            throw Error('Cargo Level must be a number.')
        } else if (valResultPilot === 'Empty' || valResultCopilot === 'Empty' || valResultFuelLevel === 'Empty' || valResultCargoLevel === 'Empty') {
            throw Error('All fields are required.')
        }
        console.log('got through validation!')
    } catch (error) {
        window.alert(error)
    }
    let liPilot = document.getElementById('pilotStatus');
    let liCopilot = document.getElementById('copilotStatus');
    liPilot.innerHTML = `Pilot ${pilot} is ready for launch`;
    liCopilot.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    const faultyItemsDiv = document.getElementById('faultyItems');
    const h2 = document.getElementById('launchStatus');
    const liFuelStatus = document.getElementById('fuelStatus');
    const liCargoStatus = document.getElementById('cargoStatus');
    if (fuelLevel >= 10000 && cargoLevel < 10000) {
        faultyItemsDiv.style.visibility = 'visible'
        h2.innerHTML = 'Shuttle is Ready for Launch';
        h2.style.color = 'green';
        liFuelStatus.innerHTML = 'Fuel level high enough for launch';
        liCargoStatus.innerHTML = 'Cargo mass low enough for launch';
    } else if (fuelLevel < 10000 && cargoLevel >= 10000) {
        faultyItemsDiv.style.visibility = 'visible'
        liCargoStatus.innerHTML = 'Cargo mass too heavy for launch'
        liFuelStatus.innerHTML = 'Fuel level too low for launch';
        h2.innerHTML = 'Shuttle Not Ready for Launch';
        h2.style.color = 'red';
    } else if (fuelLevel < 10000 && cargoLevel < 10000) {
        faultyItemsDiv.style.visibility = 'visible';
        liFuelStatus.innerHTML = 'Fuel level too low for launch';
        liCargoStatus.innerHTML = 'Cargo mass low enough for launch'
        h2.innerHTML = 'Shuttle Not Ready for Launch';
        h2.style.color = 'red';
    } else if (cargoLevel >= 10000 && fuelLevel >= 10000) {
        faultyItemsDiv.style.visibility = 'visible';
        liCargoStatus.innerHTML = 'Cargo mass too heavy for launch'
        liFuelStatus.innerHTML = 'Fuel level high enough for launch'
        h2.innerHTML = 'Shuttle Not Ready for Launch';
        h2.style.color = 'red';
    } 
 }
 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json')
                            .then( function(response) {
                                return response.json()
                            });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index]
 } 

 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;