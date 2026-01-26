console.log("hello");

const addBtn = document.getElementById("add-btn");
const gpaDisplay = document.getElementById("gpa-score");

let subjects = [];

addBtn.addEventListener("click", (e) => {
  const grade = parseFloat(document.getElementById("grade").value);
  const creditHours = parseInt(document.getElementById("cHours").value);
  const subjectName =
    document.getElementById("subject").value || "Untitled Subject";
  // 1. Validation for Duplicate Names
  const isDuplicate = subjects.some(
    (s) => s.subjectName.toLowerCase() === subjectName.toLowerCase(),
  );

  if (isDuplicate) {
    alert(`Yo, you already added "${subjectName}"! Use a different name, bro.`);
    return; // Stop the function here
  }

  if (isNaN(grade) || isNaN(creditHours)) {
    alert("Dont Play With me! Just Calculate your GPA");
    document.querySelector(".result").style.borderLeft = "5px solid #ff0000";
    gpaDisplay.style.color = "#ff0000";
    return;
  } else {
    document.querySelector(".result").style.borderLeft = "5px solid #ffcc00";
    gpaDisplay.style.color = "#ffcc00";
  }

  const subjectData = { subjectName, grade, creditHours };
  let currentTotalCredits = subjects.reduce((sum, s) => sum + s.creditHours, 0);
  if (currentTotalCredits + creditHours > 18) {
    alert(
      "Slow down, Einstein! You can't have more than 18 credit hours per semester.",
    );
    return;
  }
  subjects.push(subjectData);

  calculateGPA();
  updateTable();

  document.getElementById("subject").value = "";
  document.getElementById("cHours").value = "";
});

function calculateGPA() {
  let totalPoints = 0;
  let totalCredits = 0;
  subjects.forEach((subject) => {
    totalPoints += subject.grade * subject.creditHours;
    totalCredits += subject.creditHours;
  });

  let finalGPA = totalPoints / totalCredits;
  gpaDisplay.innerText = finalGPA.toFixed(2);
}

function updateTable() {
  const wrapper = document.querySelector(".main-wrapper");

  // Only trigger the active class if we actually have subjects
  if (subjects.length > 0) {
    wrapper.classList.add("active");
  }

  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  subjects.forEach((s) => {
    const row = `
            <tr>
                <td>${s.subjectName}</td>
                <td>${s.grade}</td>
                <td>${s.creditHours}</td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
}