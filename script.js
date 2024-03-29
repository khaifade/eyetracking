window.saveDataAcrossSessions = true;

let clickCount = 0;
const dotElement = document.getElementById("clickDot");
const alpha = 5;

const LOOK_DELAY = 1000; // milliseconds
const TOP_CUTOFF = window.innerHeight / 4;
const BOTTOM_CUTOFF = window.innerHeight - window.innerHeight / 4;
console.log(TOP_CUTOFF, BOTTOM_CUTOFF);
let startLookTime = Number.POSITIVE_INFINITY;
let lookDirection = null;
webgazer
  .setGazeListener((data, timestamp) => {
    if (data === null || lookDirection === "STOP") {
      return;
    }
    if (
      data.y < TOP_CUTOFF &&
      lookDirection !== "TOP" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = timestamp;
      lookDirection = "TOP";
    } else if (
      data.y > BOTTOM_CUTOFF &&
      lookDirection !== "BOTTOM" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = timestamp;
      lookDirection = "BOTTOM";
    } else if (data.y >= TOP_CUTOFF && data.y <= BOTTOM_CUTOFF) {
      startLookTime = Number.POSITIVE_INFINITY;
      lookDirection = null;
    }

    if (startLookTime + LOOK_DELAY < timestamp) {
      if (lookDirection === "TOP") {
        document.documentElement.scrollTop -= window.innerHeight / 2;
      } else {
        document.documentElement.scrollTop += window.innerHeight / 2;
      }
      startLookTime = Number.POSITIVE_INFINITY;
      lookDirection = "STOP";
      setTimeout(() => {
        lookDirection = "RESET";
      }, 200);
    }
  })
  .begin();

function displayPDF() {
  // Get the input element and the display area
  var input = document.getElementById("fileInput");
  var preview = document.getElementById("pdfPreview");
  // Clear existing preview
  preview.innerHTML = "";

  // Check if any file is selected
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    // Read the contents of the file
    reader.onload = function (e) {
      // Initialize PDF.js with the PDF data
      var pdfData = new Uint8Array(e.target.result);
      pdfjsLib.getDocument(pdfData).promise.then(function (pdf) {
        // Display each page of the PDF
        for (var pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          pdf.getPage(pageNumber).then(function (page) {
            var canvas = document.createElement("canvas");
            preview.appendChild(canvas);

            var context = canvas.getContext("2d");
            var viewport = page.getViewport({ scale: 1.5 });
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            var renderContext = {
              canvasContext: context,
              viewport: viewport,
            };

            page.render(renderContext);
          });
        }
      });
    };

    // Read the file as an array buffer
    reader.readAsArrayBuffer(input.files[0]);
  } else {
    // Display a message if no file is selected
    preview.innerHTML = "No file selected";
  }
}

dotElement.addEventListener("click", function () {
  clickCount++;

  if (clickCount === alpha) {
    moveToMidBottom();
  } else if (clickCount === 2 * alpha) {
    moveToBottomRight();
  } else if (clickCount === 3 * alpha) {
    moveToMidRight();
  } else if (clickCount === 4 * alpha) {
    moveToMidTop();
  } else if (clickCount === 5 * alpha) {
    moveToLeftTop();
  } else if (clickCount === 6 * alpha) {
    moveToCenter();
  } else if (clickCount === 7 * alpha) {
    moveToCenterRight();
  } else if (clickCount === 8 * alpha) {
    moveToCenterLeft();
  } else if (clickCount > 9 * alpha) {
    dotElement.style.display = "none";
  }
});

function moveToMidBottom() {
  const screenWidth = window.innerWidth;
  const dotWidth = 30;
  const middleLeft = (screenWidth - dotWidth) / 2;

  // Move the dot to the middle of the screen
  dotElement.style.left = middleLeft + "px";
}

function moveToBottomRight() {
  const screenWidth = window.innerWidth;
  const dotWidth = 30;
  const middleLeft = screenWidth - dotWidth - 200;

  // Move the dot to the middle of the screen
  dotElement.style.left = middleLeft + "px";
}
function moveToMidRight() {
  const screenHeight = window.innerHeight;
  const dotHeight = 30;
  const middleTop = screenHeight - dotHeight - 20;

  dotElement.style.bottom = middleTop + "px";
}
function moveToMidTop() {
  const screenWidth = window.innerWidth;
  const dotWidth = 30;
  const middleLeft = (screenWidth - dotWidth) / 2;

  // Move the dot to the middle of the screen
  dotElement.style.left = middleLeft + "px";
}
function moveToLeftTop() {
  // Move the dot to the middle of the screen
  dotElement.style.left = 350 + "px";
}
function moveToCenter() {
  const screenWidth = window.innerWidth;
  const dotWidth = 30;
  const middleLeft = (screenWidth - dotWidth) / 2;
  const screenHeight = window.innerHeight;
  const dotHeight = 30;
  const middleTop = (screenHeight - dotHeight) / 2;
  dotElement.style.bottom = middleTop + "px";
  dotElement.style.left = middleLeft + "px";
}
function moveToCenterRight() {
  const screenWidth = window.innerWidth;
  const dotWidth = 30;
  const middleLeft = screenWidth - dotWidth - 200;

  // Move the dot to the middle of the screen
  dotElement.style.left = middleLeft + "px";
}
function moveToCenterLeft() {
  dotElement.style.left = 200 + "px";
}
