// Friday, Dec 16, 2022
// React 5.2 - Homework: DOM Menu Lab 2
// J.T.W.

// Continue to use the "DOM Lab" HTML/CSS/JS you created in Part 1

// Menu data structure
let menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

////////////
// TASKS //
///////////

// Task 1.0
// Select and cache the <main> element in a variable named mainEl
let mainEl = document.querySelector("main");

// Task 1.1
// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
mainEl.style.backgroundColor = "var(--main-bg)";

// Task 1.2
// Set the content of mainEl to <h1>SEI Rocks!</h1>
mainEl.innerHTML = "<h1>SEI Rocks!</h1>";

// Task 1.3
// Add a class of flex-ctr to mainEl.
mainEl.classList.add("flex-ctr");

// Task 2.0
// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
let topMenuEl = document.getElementById("top-menu");

// Task 2.1
// Set the height topMenuEl to be 100%.
topMenuEl.style.height = "100%";

// Task 2.2
// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

// Task 2.3
// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add("flex-around");

// Task 3.0
// Copy the following data structure to the top of script.js

// Task 3.1
/*
      Iterate over the entire menuLinks array and for each "link" object:
      1. Create an <a> element.
      2. On the new element, add an href attribute with its value set to the href property of the "link" object.  3. Set the new element's content to the value of the text property of the "link" object.
      4. Append the new element to the topMenuEl element.
  */

function iterateMenuLink(array, menuElement) {
  array.forEach((element) => {
    // create an <a> element
    const newElement = document.createElement("a");

    // add href attribute
    newElement.setAttribute("href", element.href);

    // set element content
    newElement.innerHTML = element.text;

    // append new element
    menuElement.append(newElement);
  });
}

iterateMenuLink(menuLinks, topMenuEl);

/////////////////////////////////////////////////
// Begin React 5.2 - Homework: DOM Menu Lab 2
/////////////////////////////////////////////////

// Task 4.0
// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl
let subMenuEl = document.getElementById("sub-menu");

// Task 4.1
// Set the height subMenuEl element to be 100%.
subMenuEl.style.height = "100%";

// Task 4.2
// Set the background color of subMenuEl to the value stored in the --sub-menu-bgCSS custom property
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

// Task 4.3
// Add the class of flex-around to the subMenuEl element
subMenuEl.classList.add("flex-around");

// Task 4.4
// Set the CSS position property of subMenuEl to the value of absolute
subMenuEl.style.position = "absolute";

// Task 4.5
// Set the CSS top property of subMenuEl to the value of 0
subMenuEl.style.top = "0";

// Task 5.0
// Update the menuLinks array (refer to top of document for array)

// Task 5.1
// Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks
let topMenuLinks = document.querySelectorAll("#top-menu a");

// Declare a global showingSubMenu variable and initialize it to false;
let showingSubMenu = false;

// Task 5.2
/*  1. Attach a delegated 'click' event listener to topMenuEl
    2. The first line of code of the event listener function should call the event object's preventDefault() method
    3. The second line of code function should immediately return if the element clicked was not an <a> element
    4. Console.log the content of the <a> to verify the handler is working
    
    NOTE! -- The addEventListener() method takes two arguments, the name of the event you want to listen for, and a callback function to be executed when the event occurs.

    NOTE! -- The preventDefault() method is a method of the Event object in JavaScript that can be used to prevent the default behavior of an event from occurring. It is commonly used to prevent the submission of a form when the submit button is clicked, or to prevent a link from navigating to a new page when it is clicked.
 */

function buildSubMenu(subLinks) {
  // Clear the contents of subMenuEl
  subMenuEl.innerHTML = "";

  // Iterate over the subLinks array
  subLinks.forEach((link) => {
    // Create an <a> element
    const subMenuLink = document.createElement("a");

    // Set the href attribute of the <a> element to the href property of the "link" object
    subMenuLink.href = link.href;

    // Set the content of the <a> element to the value of the text property of the "link" object
    subMenuLink.textContent = link.text;

    // Append the <a> element to the subMenuEl element
    subMenuEl.appendChild(subMenuLink);
  });
}

topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();

  // Return if the element clicked was not an <a> element
  if (event.target.tagName !== "A") {
    return;
  }
  // Log the content of the target. This is for testing purposes only.
  console.log(event.target.textContent);

  // Check if the clicked <a> element has an "active" class
  if (event.target.classList.contains("active")) {
    // Remove the "active" class
    event.target.classList.remove("active");

    // Set showingSubMenu to false
    showingSubMenu = false;

    // Set css top property of subMenuEl to 0
    subMenuEl.style.top = "0";

    // Return to exit the handler
    return;
  }

  // Remove the "active" class from each <a> element in topMenuLinks
  topMenuLinks.forEach((link) => link.classList.remove("active"));

  // Add class name of "active" to the <a> element that was clicked
  event.target.classList.add("active");

  const link = menuLinks.find((link) => link.text === event.target.textContent);

  if (link && link.subLinks) {
    showingSubMenu = true;
  } else {
    showingSubMenu = false;
  }

  if (showingSubMenu) {
    // 1. Call buildSubMenu function passing it the subLinks array for the clicked <a> element
    buildSubMenu(link.subLinks);
    // 2. Set the CSS top property of subMenuEl to 100%
    subMenuEl.style.top = "100%";
  } else {
    // Set the CSS top property of subMenuEl to 0
    subMenuEl.style.top = "0";
  }
});

// PROGRESS CHECK! - Ensure that clicking ABOUT, CATALOG, etc. logs out about, catalog, etc. when a link is clicked

/////////////////////////////////
// Task 5.3 (completed, see above)
/////////////////////////////
// Next in the event listener, if the clicked <a> link has a class of active:
/*  1. Remove the active class from the clicked <a> element.
    2. Set the showingSubMenu to false.
    3. Set the CSS top property of subMenuEl to 0.
    4. return to exit the handler.
*/
////////////
// Task 5.4 (completed, see above)
// Next, the event listener should remove a class name of active from each <a> element in topMenuLinks- whether the activeclass exists or not.
// HINT! - Removing a non-existent class from an element does not cause an error, so just remove it!

////////////
// Task 5.5 (completed, see above)
// Next, the event listener should add a class name of active to the <a> element that was clicked.

////////////
// Task 5.6 (completed, see above)
// Set showingSubMenu to true if the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT), otherwise, set it to false.

// HINT! - saving the "link" object in a variable will come in handy for passing its subLinks array in Task 5.7

/////////////
// Task 5.7 (completed, see above)
/*
 Next in the event listener...

If showingSubMenu is true:

1. Call a buildSubMenu function passing to it the subLinks array for the clicked <a> element.
2. Set the CSS top property of subMenuEl to 100%.
Otherwise (showingSubMenuis false):

Set the CSS top property of subMenuEl to 0
*/

/////////////////
// Task 5.8 (completed, see above)
/*
Code the buildSubMenu function so that it:

Clears the contents of subMenuEl.
Iterates over the subLinks array passed as an argument; and for each "link" object:

Create an <a> element.
On the new element, add an hrefattribute with its value set to the hrefproperty of the "link" object.
Set the new element's content to the value of the textproperty of the "link" object.
Append the new element to the subMenuElelement.
*/

/////////////////
/* Task 6.0
Attach a delegated 'click' event listener to subMenuEl.

The first line of code of the event listener function should call the event object's preventDefault() method.

The second line of code function should immediately return if the element clicked was not an <a> element.

console.log the content of the <a> to verify the handler is working.
*/
subMenuEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.tagName !== "A") {
    return;
  }
  showingSubMenu = false;
  subMenuEl.style.top = "0";

  topMenuLinks.forEach((element) => {
    element.classList.remove("active");
  });
});

/////////////////
/* Task 6.1 (completed, see Task 6.0)
Next, the event listener should:

Set showingSubMenu to false.
Set the CSS top property of subMenuEl to 0
*/

/////////////////
/* Task 6.2 (completed, see Task 6.0)
Remove the class name of active from each <a> element in topMenuLinks - whether the active class exists or not.
*/

/////////////////
/* Task 6.3 
Update the contents of mainEl to the contents of the <a> element, within an <h1>, clicked within subMenuEl.
*/
subMenuEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.tagName !== "A") {
    return;
  }
  showingSubMenu = false;
  subMenuEl.style.top = "0";
  mainEl.innerHTML = `<h1>${event.target.innerHTML}</h1>`;
});

/////////////////
/* Task 6.4 
If the ABOUT link is clicked, an <h1>about</h1> should be displayed.
*/
topMenuEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName !== "A") {
    return;
  }
  if (event.target.innerHTML === "ABOUT") {
    mainEl.innerHTML = `<h1>about</h1>`;
  } else {
    mainEl.innerHTML = `<h1>${event.target.innerHTML}</h1>`;
  }
});
