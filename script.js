function calculateGPACreditsResults() {
  let gradesA = parseFloat(document.getElementById("gradesA").value) || 0;
  let gradesAMinus =
    parseFloat(document.getElementById("gradesAMinus").value) || 0;
  let gradesBPlus =
    parseFloat(document.getElementById("gradesBPlus").value) || 0;
  let gradesB = parseFloat(document.getElementById("gradesB").value) || 0;
  let gradesBMinus =
    parseFloat(document.getElementById("gradesBMinus").value) || 0;
  let gradesCPlus =
    parseFloat(document.getElementById("gradesCPlus").value) || 0;
  let gradesC = parseFloat(document.getElementById("gradesC").value) || 0;
  let gradesCMinus =
    parseFloat(document.getElementById("gradesCMinus").value) || 0;
  let gradesDPlus =
    parseFloat(document.getElementById("gradesDPlus").value) || 0;
  let gradesD = parseFloat(document.getElementById("gradesD").value) || 0;
  let gradesDMinus =
    parseFloat(document.getElementById("gradesDMinus").value) || 0;
  let gradesF = parseFloat(document.getElementById("gradesF").value) || 0;

  // Calculate total GPA points for completed courses
  const completedGPAPoints =
    gradesA * 4.0 +
    gradesAMinus * 3.7 +
    gradesBPlus * 3.3 +
    gradesB * 3.0 +
    gradesBMinus * 2.7 +
    gradesCPlus * 2.3 +
    gradesC * 2.0 +
    gradesCMinus * 1.7 +
    gradesDPlus * 1.3 +
    gradesD * 1.0 +
    gradesDMinus * 0.7 +
    gradesF * 0.0;
  const currentGPA =
    completedGPAPoints /
    (gradesA +
      gradesAMinus +
      gradesBPlus +
      gradesB +
      gradesBMinus +
      gradesCPlus +
      gradesC +
      gradesCMinus +
      gradesDPlus +
      gradesD +
      gradesDMinus +
      gradesF);

  // Display the result and GPA
  document.getElementById(
    "completedGPAPoints"
  ).innerText = `Total GPA Points: ${completedGPAPoints.toFixed(
    2
  )} | Current GPA: ${currentGPA.toFixed(2)}`;
}

function calculateRequiredGpaAndGrade() {
  // Get input values
  let currentGpaPoints =
    parseFloat(
      document
        .getElementById("completedGPAPoints")
        .innerText.split(":")[1]
        .trim()
    ) || 0;
  const plannedCourses =
    parseFloat(document.getElementById("plannedCourses").value) || 0; // Corrected typo
  const gpaGoal = parseFloat(document.getElementById("gpaGoal").value) || 0;
  let gradesA = parseFloat(document.getElementById("gradesA").value) || 0;
  let gradesAMinus =
    parseFloat(document.getElementById("gradesAMinus").value) || 0;
  let gradesBPlus =
    parseFloat(document.getElementById("gradesBPlus").value) || 0;
  let gradesB = parseFloat(document.getElementById("gradesB").value) || 0;
  let gradesBMinus =
    parseFloat(document.getElementById("gradesBMinus").value) || 0;
  let gradesCPlus =
    parseFloat(document.getElementById("gradesCPlus").value) || 0;
  let gradesC = parseFloat(document.getElementById("gradesC").value) || 0;
  let gradesCMinus =
    parseFloat(document.getElementById("gradesCMinus").value) || 0;
  let gradesDPlus =
    parseFloat(document.getElementById("gradesDPlus").value) || 0;
  let gradesD = parseFloat(document.getElementById("gradesD").value) || 0;
  let gradesDMinus =
    parseFloat(document.getElementById("gradesDMinus").value) || 0;
  let gradesF = parseFloat(document.getElementById("gradesF").value) || 0;

  const totalClasses =
    gradesA +
    gradesAMinus +
    gradesBPlus +
    gradesB +
    gradesBMinus +
    gradesCPlus +
    gradesC +
    gradesCMinus +
    gradesDPlus +
    gradesD +
    gradesDMinus +
    gradesF;

  // Check for division by zero
  if (plannedCourses === 0) {
    document.getElementById("result").innerText =
      "Please enter the number of planned courses.";
    return; // Stop the function if plannedCourses is zero
  }

  // Calculate total GPA points required to achieve the goal
  const totalGpaPointsRequired = (totalClasses + plannedCourses) * gpaGoal; //23*3.88 = 89.24

  // Calculate the required GPA points from new courses
  const requiredGpaPointsFromNewCourses =
    totalGpaPointsRequired - currentGpaPoints; //7.94

  // Calculate the minimum GPA required to achieve the goal
  const minimumGpaRequired = requiredGpaPointsFromNewCourses / plannedCourses; //3.88

  // Function to get the grade suggestion based on GPA
  function getGradeFromGpa(gpa) {
    if (gpa >= 3.68) return "A+/A";
    if (gpa >= 3.34) return "A-";
    if (gpa >= 3.01) return "B+";
    if (gpa >= 2.68) return "B";
    if (gpa >= 2.34) return "B-";
    if (gpa >= 2.01) return "C+";
    if (gpa >= 1.68) return "C";
    if (gpa >= 1.34) return "C-";
    if (gpa >= 1.01) return "D+";
    if (gpa >= 0.68) return "D";
    if (gpa >= 0.01) return "D-";
    if (gpa >= 0.0) return "F";
  }

  // Display the results
  if (requiredGpaPointsFromNewCourses <= 0) {
    document.getElementById("result").innerText =
      "Your current GPA is already higher than your goal! (Or please make sure you filled out the GPA Goal field. :D)";
  } else if (minimumGpaRequired > 4) {
    document.getElementById("result").innerHTML =
      "You cannot do this in one term. Please make sure you are setting realistic goals.";
  } else {
    document.getElementById("result").innerHTML = `
                You need to achieve a GPA of <strong>${minimumGpaRequired.toFixed(
                  2
                )}</strong> or <strong>${getGradeFromGpa(
      minimumGpaRequired
    )}</strong> in your next courses to reach your goal.<br>
            `;
  }
}
