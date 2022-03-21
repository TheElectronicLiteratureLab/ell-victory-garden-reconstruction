//-------------------- Create the elements for the UI. --------------------//

//Create <nav> element to hold all the UI.
const eleNavBox = document.createElement("nav");
eleNavBox.className = "ui-box";

//Create an <img> test to show the UI mockup.
const eleUiImage = document.createElement("img");
eleUiImage.src = "images/ui/ui-test.png";

//Create a <button> for moving the path forward.
const eleTestPathBtn = document.createElement("button");
eleTestPathBtn.className = "ui-path-fw";
eleTestPathBtn.setAttribute("onclick", "pathFinder();");

//Create a test <button> as a placeholder.
const eleTestBtn1 = document.createElement("button");
eleTestBtn1.className = "ui-test-1";

//Create a <button> for moving the stream forward.
const eleTestStreamBtn = document.createElement("button");
eleTestStreamBtn.className = "ui-stream-fw";
eleTestStreamBtn.setAttribute("onclick", "streamLiner();");

//Create a test <button> as a placeholder.
const eleTestBtn2 = document.createElement("button");
eleTestBtn2.className = "ui-test-2";

//Create a test <button> as a placeholder.
const eleTestBtnCenter = document.createElement("button");
eleTestBtnCenter.className = "ui-test-center";

//-------------------- Append the elements to each other. --------------------//
eleNavBox.appendChild(eleUiImage);
eleNavBox.appendChild(eleTestPathBtn);
eleNavBox.appendChild(eleTestStreamBtn);
eleNavBox.appendChild(eleTestBtn1);
eleNavBox.appendChild(eleTestBtn2);
eleNavBox.appendChild(eleTestBtnCenter);

//-------------------- Get the html body tag and put everything inside it. --------------------//
const main = document.body;
main.appendChild(eleNavBox);