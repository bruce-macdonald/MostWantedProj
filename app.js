"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Would you like to search by 'name' or 'trait'?", nameTrait).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'name':
      searchResults = searchByName(people);
      break;
    case 'trait':
      searchResults = searchByTrait(people)
    default: app(people);
      break;

  }
  if (searchResults.length === 1) {
    mainMenu(searchResults[0], people);
    return app(people); // restart
  }
  else {
    displayPeople(searchResults)
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
}



// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function (person) {
    if (person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPerson;
}


function searchByTrait(people) {
  let traitToSearchBy = promptFor("What trait would you like to search by?\nEnter 'gender' or 'dob' or 'height' or 'weight' or 'eyecolor' or occupation' or 'parents' or 'spouse'", traitToLower).toLowerCase();
  let traitSearchResults;
  switch (traitToSearchBy) {
    case 'gender':
      traitSearchResults = searchByGender(people);
      searchAgain(traitSearchResults)
      break;
    case 'dob':
      traitSearchResults = searchByDob(people);
      searchAgain(traitSearchResults)
      break;
    case 'height':
      traitSearchResults = searchByHeight(people);
      searchAgain(traitSearchResults)
      break;
    case 'weight':
      traitSearchResults = searchByWeight(people);
      searchAgain(traitSearchResults)
      break;
    case 'eyecolor':
      traitSearchResults = searchByEyecolor(people);
      searchAgain(traitSearchResults)
      break;
    case 'occupation':
      traitSearchResults = searchByOccupation(people);
      searchAgain(traitSearchResults)
      break;
    case 'parents':
      traitSearchResults = searchByParents(people);
      searchAgain(traitSearchResults)
      break;
    case 'spouse':
      traitSearchResults = searchBySpouse(people);
      searchAgain(traitSearchResults)
      break;
    default: 
      prompt("Invalid input, please select from list of options")
      searchByTrait(people);
      break;
    }
}

function searchAgain(traitSearchResults) {
  let response = promptFor("Would you like to search further?", yesNo).toLowerCase();
  switch (response) {
    case 'yes':
      searchByTrait(traitSearchResults);
      break;
    case 'no':
      return displayPeople(traitSearchResults);
    default: searchAgain(traitSearchResults);
  }
}

// function searchByAge(people) {
//   let birthday = promptFor("What is the person's age?", chars);


//   let foundPerson = people.filter(function (person) {
//     if (person.dob === Date.) {
//       return true;
//     }
//     else {
//       return false;
//     }
//   })
//   return foundPerson;
// }

function searchByGender(people) {
  let gender = promptFor("What is the person's gender?", chars);


  let foundPerson = people.filter(function (person) {
    if (person.gender === gender) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPerson;
}

function searchByHeight(people) {
  let height = promptFor("What is the person's height(in inches)?", chars);


  let foundPerson = people.filter(function (person) {
    if (person.height == height) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPerson;
}


function searchByWeight(people) {
  let weight = promptFor("What is the person's weight(in pounds)?", chars);


  let foundPerson = people.filter(function (person) {
    if (person.weight == weight) {
      return true;
    }
    else {
      return false;
    }
  })
  return foundPerson;
}
// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    var i = (people.indexOf(person)+1);
    return i + ") " + person.firstName + " " + person.lastName;
  }).join("\n"));
}

//"Please enter the number of the profile to view\n"

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  //personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  //personInfo += "Parents: " + person.parents + "\n";
  //personInfo += "Spouse: " + person.spouse.firstName + " " + person.spouse.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function nameTrait(input) {
  return input.toLowerCase() == "name" || input.toLowerCase() == "trait";
}
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function traitToLower(input) {
  return input.toLowerCase() == "gender" || input.toLowerCase() == "dob" || input.toLowerCase() == "height"
    || input.toLowerCase() == "weight" || input.toLowerCase() == "eyecolor" || input.toLowerCase() == "occupation"
    || input.toLowerCase() == "parents" || input.toLowerCase() == "spouse";
}
// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}
