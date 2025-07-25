const apiEP = "https://randomuser.me/api/?results=2";

let userList = [];

//slide to go to next app screen
const sliderElem = document.getElementById("mySlider");
sliderElem.addEventListener("change", (e) => {
  //console.log(e); //check properties
  //console.log(e.target.value); //get the value when sliding

  const value = e.target.value;
  //or deconstructure
  //const {value}=e.target;
  //   console.log(value);
  const label = document.getElementById("label");
  //   alert("You can go to next page");
  if (value > 70) {
    // text in label disapear
    label.textContent = "";
    displayAppScreen();
  } else {
    label.textContent = "Slide to Unlock";
  }
});

const displayAppScreen = () => {
  //hide Show screen
  document.querySelector(".homeScreen").style.display = "none";
  //show App screen
  document.querySelector(".appScreen").style.display = "block";
};

//display contactListScreen
const displayContactListScreen = () => {
  //hide Show screen
  document.querySelector(".appScreen").style.display = "none";
  //show App screen
  document.querySelector(".contactListScreen").style.display = "block";

  //call the function-api
  fetchUsers(apiEP);
};

//fetch users
const fetchUsers = async (url) => {
  //fetch user
  //promise method
  //   fetch(url)
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //
  //async await
  const response = await fetch(url); //get Promise
  const data = await response.json(); //get Results array, the data
  //   console.log(data);
  //
  //Everytime we fetch data, we pass data to userList to be used outside
  userList = data.results;
  //console.log(userList); //exact data we're looking for

  //hide the spinner
  document.querySelector(".showSpinner").style.display = "none";
  //show the user
  displayContactList(userList);
};

//fetchUsers(apiEP);

//display contact list
const displayContactList = (userList) => {
  //userList is available here
  document.getElementById("list").style.display = "block";

  let str = "";

  userList.map((item, i) => {
    return (str += `<div class="accordion-item">
  <!-- ACCORDION HEADER OR BUTTON  -->
  <h2 class="accordion-header">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapse${i}"
      aria-expanded="false"
      aria-controls="collapse${i}"
    >
      <img
        src="${item.picture.large}"
        alt="user"
        width="50px"
        class="rounded-circle"
      />
      <div class="ms-2">
        <div class="fw-bolder">${item.name.title} ${item.name.first} ${item.name.last}</div>
        <small>${item.location.street.number} ${item.location.street.name}</small>
      </div>
    </button>
  </h2>
  <!-- COLLAPSE OF ACCORDION  -->
  <div
    id="collapse${i}"
    class="accordion-collapse collapse"
    data-bs-parent="#accordionExample"
  >
    <!-- List of details  -->
    <div
      class="accordion-body d-flex flex-column align-items-center"
    >
      <img
        src="${item.picture.large}"
        alt="user"
        width="150px"
        class="rounded-circle"
      />
      <div>
        <div class="fw-bolder">
          <i class="fa-solid fa-user"></i>
          ${item.name.title} ${item.name.first} ${item.name.last}
        </div>
        <div>
          <a href="tel:${item.phone}">
            <i class="fa-solid fa-phone-flip"></i> ${item.phone}
          </a>
        </div>
        <div>
          <a href="mailto:${item.email}">
            <i class="fa-solid fa-envelope"></i> ${item.email}
          </a>
        </div>
        <div>
          <a
            href="https://www.google.com/maps/place/${item.location.street.number}+${item.location.street.name}+${item.location.city}+${item.location.state}+${item.location.postcode}+${item.location.country}"
            target="_blank"
          >
            <i class="fa-solid fa-location-dot"></i> ${item.location.street.number} ${item.location.street.name}, ${item.location.state}
          </a>
        </div>
      </div>
    </div>
  </div>
</div>`);
  });

  document.getElementById("userAccordion").innerHTML = str;

  //show number of users in the list/filtered list
  document.getElementById("userCount").innerText = userList.length;
};

//SEARCH CONTACT
//keypress,keyup,keydown event=every time i type sth in the input, for every single character i insert, it's 1 event
document.getElementById("search").addEventListener("keyup", (e) => {
  // console.log(e);
  let value = e.target.value;
  //console.log(value); //printing straight doesn't work
  //
  //filteredUsers=Array
  const filteredUsers = userList.filter((item) => {
    let name = item.name.first + "" + item.name.last;
    name = name.toLowerCase();
    value = value.toLowerCase();
    return name.includes(value);
  });
  displayContactList(filteredUsers);
});
