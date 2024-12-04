// check local storage
let mainColor = localStorage.getItem("color_main");

// add the main color from the local storage
if (mainColor) {
  document.documentElement.style.setProperty('--main-color', mainColor)
  document.documentElement.style.setProperty('--main-color-tr', mainColor+"f0")

}

// select landing element
let landingPage = document.getElementsByClassName("landing-page")[0];

// make array of image
let imgsArray = ["background-1.jpg",
    "background-2.jpg",
    "background-3.jpg",
    "background-4.jpg",
    "background-5.jpg",
    "background-6.jpg"];

//set the background accourding to local storage
if (localStorage.i) {
  landingPage.style.backgroundImage = `url("pics/${imgsArray[localStorage.i%imgsArray.length]}")`;
}

// change background url.
let count = localStorage.i || 0;
// making a global valubale to hold the interval
let backRoulate;
// make role function and active it
function startRole() {
  backRoulate = setInterval(() => {
    landingPage.style.backgroundImage = `url("pics/${imgsArray[count%imgsArray.length]}")`;
    localStorage.setItem("i", count);
    console.log(count)
    count++;
  }, 5000);
};

// select yes and no buttons
let yesButton = document.getElementsByClassName("yes")[0];
let noButton = document.getElementsByClassName("no")[0];

//get rolate calue from local storage
if (localStorage.rolate === "active") {
  startRole();
  yesButton.classList.add("active");
  noButton.classList.remove("active");
} else if (localStorage.rolate === "deactive") {
  stopRole();
  noButton.classList.add("active");
  yesButton.classList.remove("active");
}

yesButton.addEventListener("click", _ => {
  startRole();
  yesButton.classList.add("active");
  noButton.classList.remove("active");
  //save setting in localStorage
  localStorage.setItem("rolate", "active");
});
noButton.addEventListener("click", _=> {
  stopRole();
  noButton.classList.add("active");
  yesButton.classList.remove("active");
    //save setting in localStorage
  localStorage.setItem("rolate", "deactive");
});


// select img click
let imgsClick = document.querySelectorAll(".option-box.back img");
// add event 
imgsClick.forEach(e => {
  e.addEventListener("click", ele => {
    stopRole();
    noButton.classList.add("active");
    yesButton.classList.remove("active");
    //save setting in localStorage
    localStorage.setItem("rolate", "deactive");

    landingPage.style.backgroundImage = `url("pics/${imgsArray[e.dataset.num]}")`;
    localStorage.setItem("i", e.dataset.num);
    count = localStorage.i;
    for (i of imgsClick) {
      i.classList.remove("active");
    }
    ele.target.classList.add("active");
  })
})
// make a stop function to deactive
function stopRole() {
  clearInterval(backRoulate);
}

// Switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

for (let li of colorsLi) {
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);
    // console.log(e.target.parentElement);
    for (let j of colorsLi) {
      j.classList.remove("active");
    }
    e.target.classList.add("active")
    // set color on root
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
    document.documentElement.style.setProperty('--main-color-tr', e.target.dataset.color+"f0")
    localStorage.setItem("color_main", e.target.dataset.color)
  })
}

for (let li of colorsLi) {
  if (li.dataset.color === mainColor) {
    li.classList.add("active");
  } else {
    li.classList.remove("active")
  }
}

// select settings box & gear
let gear = document.querySelector(".setting-box i");
// let gearArea = document.querySelector(".setting-box .gear-cotainer");
let setBox = document.querySelector(".setting-box");
gear.addEventListener("click", _ => {
  setBox.classList.toggle("left-0");
  setTimeout(() => {
    gear.classList.toggle("fa-spin");
  }, 700);
})


//Make the header stickey
const header = document.getElementsByTagName("header")[0];
let lastScroll = 0;

window.addEventListener('scroll', _ => {
  
});


// select ratings
let ourRatings = document.querySelector(".ratings");
let ourORatings = document.querySelectorAll(".rate-box span");

//make the rating dynamic
window.onscroll = function() {
  // skills offset top
  let ratingOffTop = ourRatings.offsetTop;
  let ratingHeight = ourRatings.offsetHeight;
  let windowHeight = this.innerHeight;
  let scrolled = this.scrollY || document.documentElement.scrollTop
  // this.console.log(scrolled);
  if (scrolled > (ratingOffTop - 58)) {
    for (let i of ourORatings) {
      i.style.width = i.dataset.width;
    }
  }else if (scrolled > ratingOffTop + ratingHeight || scrolled < ratingOffTop - windowHeight) {
    for (let i of ourORatings) {
      i.style.width = 0;
    }
  }

  // let currentScroll = this.pageYoffset || document.documentElement.scrollTop;
  let scrollDiff = scrolled - lastScroll;
  const headerTop = parseInt(header.style.top) || 0;
  if (scrollDiff > 0) {
    header.style.top = `${Math.max(headerTop - scrollDiff, -header.offsetHeight)}px`
  } else {
    header.style.top = `${Math.min(headerTop - scrollDiff, 0)}px`
  }
  lastScroll = scrolled;

  if (scrolled > windowHeight) {
    header.style.backgroundColor = "var(--main-color)";
  } else {
    header.style.backgroundColor = "transparent";
  }
  // this.console.log(ratingHeight);
}

// Create popup with the image 
let ourGallery = document.querySelectorAll(".gallery img");

for (let i of ourGallery) {
  i.addEventListener("click", e => {
    // create element
    let div = document.createElement("div");
    let container = document.createElement("div");
    // add class overlay
    div.className = "popup-overlay";
    container.className = "popup-container";
    // let pic = e.target;
    let picClone = e.target.cloneNode(true);
    div.append(container)
    container.append(picClone)
    //append overlay to the body
    document.body.append(div);
    //make an out for the overlay
    // div.addEventListener("click", _=> div.remove()); // the easy way
    let closeSpan  = document.createElement("span");
    closeSpan.innerHTML = "&cross;"
    closeSpan.addEventListener("click", _=> div.remove());
    container.append(closeSpan)
    //make heading لو عايزين يعني
    // if (picClone.alt !== null) {
    //   // Creat heading
    //   let head = document.createElement("h3");
    //   //add text
    //   head.innerText = picClone.alt
    //   div.append(head)
    // }
  })
}
