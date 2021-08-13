console.log('App is running'); // was '42'

const myfunnn = () => {
  const dropdownMenu = document.getElementById("dropdown-menu");
  dropdownMenu.classList.toggle("active");
};

//! this route does not exist (yet) - commenting out for now
//GET ALL NOTES
// const getAlluser = async () => {
//   console.log('INDEX | getAllUser ')
//   const res = await fetch("/api/getAllUserdata", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await res.json();
//   console.log(data);
// };

// getAlluser();


// destroy this app on heroku
// create a new app from the same repo (github)