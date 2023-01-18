/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");
addGamesToPage(GAMES_JSON);
// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for(let i = 0; i < games.length; i++ )
    {
       gamesContainer.innerHTML +=`<div class = "game-card">
       <img class = "game-img" src= ${games[i].img}>
       <h1>${games[i].name}</h1>
       <p>${games[i].description}</p>
       <p>Backers: ${games[i].backers}</p>
       <p>${goalReached(games[i])}</p>
   </div>`
    }
        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const totalContribution = GAMES_JSON.reduce((total,games) => total + games.backers, 0);
contributionsCard.innerHTML = totalContribution.toLocaleString("en-US");

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total,games) => total + games.pledged, 0);
raisedCard.innerHTML = "$" + totalRaised.toLocaleString("en-US");

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfunded = GAMES_JSON.filter(unfundedgames => (unfundedgames.pledged < unfundedgames.goal))
    addGamesToPage(unfunded);
    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const funded = GAMES_JSON.filter(fundedgames => (fundedgames.pledged > fundedgames.goal))
    addGamesToPage(funded);

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    gamesCard.innerHTML = GAMES_JSON.length;
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly);
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");
// use filter or reduce to count the number of unfunded games
const unfunded = GAMES_JSON.filter(unfundedgames => (unfundedgames.pledged < unfundedgames.goal))
const funded = GAMES_JSON.filter(fundedgames => (fundedgames.pledged > fundedgames.goal))
const description = document.createElement("p");
description.innerHTML =  unfunded.length <= 1 ? `A total of ${totalRaised.toLocaleString("en-US")} has been raised for ${funded.length}. Currently, ${unfunded.length} game remains unfunded. We need your help to fund these amazing games!` : `A total of ${totalRaised.toLocaleString("en-US")} has been raised for ${funded.length}. Currently, ${unfunded.length} games remains unfunded. We need your help to fund these amazing games!`
descriptionContainer.appendChild(description);

// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
const [first, second, ...rest] = sortedGames;
const topfunded = document.createElement("p");
const runnerup = document.createElement("p");
topfunded.innerHTML = `${first.name}`;
runnerup.innerHTML = `${second.name}`
firstGameContainer.appendChild(topfunded);
secondGameContainer.appendChild(runnerup);

//Search Function
const search = document.getElementById("search");
search.addEventListener('keyup', (e) => {
    const test = GAMES_JSON.filter( input => {
        return input.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    const list = test.map((input) => {
        return `<div class = "game-card">
        <img class = "game-img" src= ${input.img}>
        <h1>${input.name}</h1>
        <p>${input.description}</p>
        <p>Backers: ${input.backers}</p>
        <p>${goalReached(input)}</p>
    </div>`
    })
    gamesContainer.innerHTML = list;
    })
function goalReached(game)
{
    if(game.pledged > game.goal)
    {
        return `<p>Goal Reached!</p>`;
    }
    else{
        let amount_left = game.goal - game.pledged;
        return `<p>$${amount_left.toLocaleString("en-US")} left till goal reached!</p>`;
    }
}

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item