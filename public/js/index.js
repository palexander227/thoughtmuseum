console.log(42);

const myfunnn = () => {
  const dropdownMenu = document.getElementById("dropdown-menu");
  dropdownMenu.classList.toggle("active");
};

//GET ALL NOTES
const getAlluser = async () => {
  const res = await fetch("/api/getAllUserdata", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log(data);
};

getAlluser();
