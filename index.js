//Storing the ids and classes in a variable to use in my javascripts Reference is https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
const NAV_BAR = document.getElementById('navBar');
const NAV_LIST = document.getElementById('navList');
const HERO_HEADER = document.getElementById('heroHeader');
const HAMBURGER_BTN = document.getElementById('hamburgerBtn');
const NAV_LINKS = Array.from( document.querySelectorAll('.nav__list-link')); // Getting the array from the document.querySelectorAll('.nav__list-link')
const SERVICE_BOXES = document.querySelectorAll('.service-card__box');
const ACTIVE_LINK_CLASS = 'active';
const BREAKPOINT = 576; //milliseconds to move from one active link to the next

let currentServiceBG = null;
let currentActiveLink = document.querySelector('.nav__list-link.active');

// Remove the active state once the breakpoint is reached
const resetActiveState = ()=>{
  NAV_LIST.classList.remove('nav--active'); //I am removing the classlist of nav--active 
  Object.assign(NAV_LIST.style, { //Assigning the Object(resetActiveState) to have a height of null(means no value)
    height: null
  });
  Object.assign(document.body.style, { //I Selecting the documents body and giving it css style of overflowY: null (to show nothing overflowing on the y- axis)
    overflowY: null
  });
}

//Add padding to the header to make it visible because navbar has a fixed position.
const addPaddingToHeroHeaderFn = () => {
  const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height; //I want to get the rectangle height of the DOM of the NAV-BAR
  const HEIGHT_IN_REM = NAV_BAR_HEIGHT / 10; 

  // If hamburger button is active, do not add padding
  if (NAV_LIST.classList.contains('nav--active')) {
    return;
  }
  Object.assign(HERO_HEADER.style, {
    paddingTop: HEIGHT_IN_REM + 'rem' //I am concatenating the HEIGHT_IN_REM with the string 'rem' to create the height in rem. HEIGHT_IN_REM = 10, I will get 10rem.
  });
}
addPaddingToHeroHeaderFn(); //Callback function 
window.addEventListener('resize', ()=>{ //I want to resize the padding of the heroheader by calling the addPaddingToHeroHeaderFn() within a global scope.
  addPaddingToHeroHeaderFn();

  // When the navbar is active and the window is being resized, remove the active state once the breakpoint is reached
  if(window.innerWidth >= BREAKPOINT){ // if the window size is bigger than the breakpoint than callback addPaddingToHeroHeaderFn() function and callback resetActiveState() to reset the active link.
    addPaddingToHeroHeaderFn();
    resetActiveState();
  }
});

// As the user scrolls, the active link(nav bars) should change based on the section currently displayed on the screen.
window.addEventListener('scroll', ()=>{ //Adding event listener scroll
  const sections = document.querySelectorAll('#heroHeader, #services, #works, #contact'); //When I scroll down the page the active link bars will change respective to their id sections

  // Loop through sections and check if they are visible
  sections.forEach((section) => {
    const sectionTop = section.offsetTop; // offsetTop  returns the distance from the outer border of the section to the top padding edge
    const NAV_BAR_HEIGHT = NAV_BAR.getBoundingClientRect().height; // I want to get the rectangle height of the DOM of the NAV-BAR
    if (window.scrollY >= sectionTop - NAV_BAR_HEIGHT) { //If the window on the y axis is greater that the top of the section - nav bar height
      const ID = section.getAttribute('id'); // Get the id of the section
      const LINK = NAV_LINKS.filter(link => { //Nav links is an array and I want to filter the array by passing a parameter of link which returns the links href attribute to include a # and the id next to it. e.g main will return a #main on the nav bar link
        return link.href.includes('#'+ID);
      })[0];
      console.log(LINK); //To check if link works
      currentActiveLink.classList.remove(ACTIVE_LINK_CLASS); // Removing the current link using the classlist.remove. e.g clicking on next nav bar link removes the previous active link
      LINK.classList.add(ACTIVE_LINK_CLASS); //Adds the next nav bar link and makes it active. e.g. Once you click on sevices nav bar link the services active link will be added.
      currentActiveLink = LINK;
    }
  });
});

// Shows & hide navbar on smaller screen
HAMBURGER_BTN.addEventListener('click', ()=>{
  NAV_LIST.classList.toggle('nav--active');
  if (NAV_LIST.classList.contains('nav--active')) {
    Object.assign(document.body.style, { //show no overflows on the y axis
      overflowY: 'hidden'
    });
    Object.assign(NAV_LIST.style, {
      height: '100vh' //100 viewport height
    });
    return;
  }
  Object.assign(NAV_LIST.style, {
    height: 0
  });
  Object.assign(document.body.style, {
    overflowY: null
  });
});

// When navbar link is clicked, reset the active state
NAV_LINKS.forEach(link => {
  link.addEventListener('click', ()=>{
    resetActiveState();
    link.blur(); //blur in built method blurs the links
  })
})

// Handles the hover animation on services section
SERVICE_BOXES.forEach(service => {
  const moveBG = (x, y) => {//Creating a function which allows me to enter and move and leave the box with the mouse animation
    Object.assign(currentServiceBG.style, {
      left: x + 'px', //The x will present the x axis
      top: y + 'px', // Thes y will represent the y axis
    })
  }
  service.addEventListener('mouseenter', (e) => {
    if (currentServiceBG === null) {
      currentServiceBG = service.querySelector('.service-card__bg');
    }
    moveBG(e.clientX, e.clientY); //This allows the client to enter the service box with my mouse from the x axis and the y axis.
  });
  service.addEventListener('mousemove', (e) => {
    const LEFT = e.clientX - service.getBoundingClientRect().left; //Allows me to move my mouse on the x axis
    const TOP = e.clientY - service.getBoundingClientRect().top; //Allows me to move my mouse on the y axis
    moveBG(LEFT, TOP); //Calling back the function to execute the left and top variables
  });
  service.addEventListener('mouseleave', () => {
    const IMG_POS = service.querySelector('.service-card__illustration')
    const LEFT = IMG_POS.offsetLeft + currentServiceBG.getBoundingClientRect().width; // As the mouse leaves from the x axis the animation stops
    const TOP = IMG_POS.offsetTop + currentServiceBG.getBoundingClientRect().height; // As the mouse leaves y axis the animation stops

    moveBG(LEFT, TOP);
    currentServiceBG = null;
  });
});

// Handles smooth scrolling by creating a constructor method
new SweetScroll({
  trigger: '.nav__list-link', // Every nav link will scrolled down the page will be triggered
  easing: 'easeOutQuint', // Every nav link will easeout smoothly on the scroll
  offset: NAV_BAR.getBoundingClientRect().height - 80 //I want to return the top position of the nav bar DOM rectangle height - 80
});

//Canvas animation

const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d'); // The animation will be showing in 2d

//I want the canvas to cover the overall size of the header right container

canvas.width = window.innerWidth; // I want the canvas width to equal the size of the window inner width(I will be covering the width of the header right container)
canvas.height = window.innerHeight; // I want the canvas height to equal the size of the window inner height(I will be covering the height of the header right container) 

//Storing the matrix alphabet
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
// I want to concatenate the three variables and store it in alphabet variable
const alphabet = katakana + latin + nums;

//Store the fontSize and the canvas width will be divided by the fontsize which will make up the columns of the canvas
//The column will calculate how many characters I can fit in the screen
const fontSize = 16;
const columns = canvas.width/fontSize;

//Create an empty array to position the rainDrops
const rainDrops = [];

//Setting the y coordinate to 1 for every x-coordinates. index of element is x coordinate and value of element is y coordinate
for( let x = 0; x < columns; x++ ) {
	rainDrops[x] = 1; // all the x axis will be equal to the y axis of one 
}

//Create the draw function
const draw = () => {
	context.fillStyle = 'rgba(0, 0, 0, 0.05)'; // This is to give the opacity of each fonts 0.05 otherwise without this we will see a just a blue colored background, gives a fading effect as each character moves down the screen
	context.fillRect(0, 0, canvas.width, canvas.height); // Fills the canvas in a rectangle box of the header right container
	
	context.fillStyle = 'aqua'; //Color of the fonts
	context.font = fontSize + 'px monospace'; // I want the font size to be concatenated with the font style of monospace. eg. 16px monospace 

  //For loop though the empty rainDrops array 
	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length)); // charAt will give me back the character instead of the index number. (Math.floor(Math.random() * alphabet.length)) will give me a random character within the alphabet length.
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize); // multiplying the x and y coordinates with font-size because the spacing is needed between each text.
    //The first parameter text will be the character I want to print on the screen, the second parameter i*fontSize is the x coordinate and the third parameter rainDrops[i]*fontSize is the y coordinate
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){ // The purpose of the Math.random() > 0.975 is to randomize the reset of the columns which will give a ring-like effect
			rainDrops[i] = 0; //  If the y coordinate is greater the canvas height the y coordinate is set to 0 so the characters can start falling again
        }
		rainDrops[i]++; // The first column line of the y axis will show but the iteration afterwards will not show the first column on the y axis. 
	}
};

setInterval(draw, 50); // Calling back the function and setting the speed in milliseconds
