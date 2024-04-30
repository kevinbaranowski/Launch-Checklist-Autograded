// Write your JavaScript code here!

window.addEventListener("load", function() {
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        const planet = pickPlanet(listedPlanets);
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
    })
    let form = document.querySelector('[data-testid="testForm"]');
    form.addEventListener('submit', function() {
        event.preventDefault();
        const pilotInput = document.querySelector("[name='pilotName']");
        const copilotInput = document.querySelector("[name='copilotName']");
        const fuelLevelInput = document.querySelector("[name='fuelLevel']");
        const cargoMassInput = document.querySelector("[name='cargoMass']");
        formSubmission(document, listedPlanets, pilotInput.value, copilotInput.value, fuelLevelInput.value, cargoMassInput.value);
    })
    
 });