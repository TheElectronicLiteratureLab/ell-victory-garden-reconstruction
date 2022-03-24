//-------------------- Create the elements for the UI. --------------------//

//Create <div> element to hold all the UI and position it.
const eleNavPos = document.createElement("div");
eleNavPos.className = "ui-pos";

//Create <nav> element to contain the UI components.
const eleNavBox = document.createElement("nav");
eleNavBox.className = "ui-box";

//Create an <img> test to show the UI mockup.
const eleUiTemplate = document.createElement("img");
eleUiTemplate.className = "ui-template";
eleUiTemplate.src = "images/ui/ui-test.png";

//Create an <img> for the UI helix.
const eleUiHelix = document.createElement("div");
eleUiHelix.className = "ui-helix";

//Create a <button> first in the UI.
const eleTopBtn = document.createElement("button");
eleTopBtn.className = "ui-button-1";
const eleTopBtnOvr = document.createElement("button");
eleTopBtnOvr.className = "ui-button-1-over";
eleTopBtn.setAttribute("onclick", "window.location.href='./theMap.html';");

//Create a <button> second in the UI.
const eleSecBtn = document.createElement("button");
eleSecBtn.className = "ui-button-2";
const eleSecBtnOvr = document.createElement("button");
eleSecBtnOvr.className = "ui-button-2-over";
eleSecBtn.setAttribute("onclick", "window.location.href='./Streamlines.html';");

//Create a <button> in the center of the UI.
const eleCenBtn = document.createElement("button");
eleCenBtn.className = "ui-button-0";
const eleCenBtnOvr = document.createElement("button");
eleCenBtnOvr.className = "ui-button-0-over";
eleCenBtn.setAttribute("onclick", "window.location.href='./readME.html';");

//Create a <button> third in the UI.
const eleThrBtn = document.createElement("button");
eleThrBtn.className = "ui-button-3";
const eleThrBtnOvr = document.createElement("button");
eleThrBtnOvr.className = "ui-button-3-over";
eleThrBtn.setAttribute("onclick", "window.location.href='./Pathfinder.html';");

//Create a <button> fourth in the UI.
const eleBtmBtn = document.createElement("button");
eleBtmBtn.className = "ui-button-4";
const eleBtmBtnOvr = document.createElement("button");
eleBtmBtnOvr.className = "ui-button-4-over";
eleBtmBtn.setAttribute("onclick", "window.location.href='./index.html';");

//Create a <button> for moving back in the stream.
const eleStmBckBtn = document.createElement("button");
eleStmBckBtn.className = "ui-stream-back";
const eleStmBckBtnOvr = document.createElement("button");
eleStmBckBtnOvr.className = "ui-stream-back-over";
eleStmBckBtn.setAttribute("onclick", "streamLiner('rev');");

//Create a <button> for moving forward in the stream.
const eleStmFwdBtn = document.createElement("button");
eleStmFwdBtn.className = "ui-stream-forward";
const eleStmFwdBtnOvr = document.createElement("button");
eleStmFwdBtnOvr.className = "ui-stream-forward-over";
eleStmFwdBtn.setAttribute("onclick", "streamLiner('fwd');");

//Create a <button> for moving back in the path.
const elePthBckBtn = document.createElement("button");
elePthBckBtn.className = "ui-path-back";
const elePthBckBtnOvr = document.createElement("button");
elePthBckBtnOvr.className = "ui-path-back-over";
elePthBckBtn.setAttribute("onclick", "pathFinder('rev');");

//Create a <button> for moving forward in the path.
const elePthFwdBtn = document.createElement("button");
elePthFwdBtn.className = "ui-path-forward";
const elePthFwdBtnOvr = document.createElement("button");
elePthFwdBtnOvr.className = "ui-path-forward-over";
elePthFwdBtn.setAttribute("onclick", "pathFinder('fwd');");

//-------------------- Append the elements to each other. --------------------//
eleNavPos.appendChild(eleNavBox);

eleNavBox.appendChild(eleUiTemplate);
eleNavBox.appendChild(eleTopBtnOvr);
eleNavBox.appendChild(eleTopBtn);
eleNavBox.appendChild(eleSecBtnOvr);
eleNavBox.appendChild(eleSecBtn);
eleNavBox.appendChild(eleCenBtnOvr);
eleNavBox.appendChild(eleCenBtn);
eleNavBox.appendChild(eleThrBtnOvr);
eleNavBox.appendChild(eleThrBtn);
eleNavBox.appendChild(eleBtmBtnOvr);
eleNavBox.appendChild(eleBtmBtn);

eleNavBox.appendChild(eleStmBckBtnOvr);
eleNavBox.appendChild(eleStmBckBtn);
eleNavBox.appendChild(eleStmFwdBtnOvr);
eleNavBox.appendChild(eleStmFwdBtn);

eleNavBox.appendChild(elePthBckBtnOvr);
eleNavBox.appendChild(elePthBckBtn);
eleNavBox.appendChild(elePthFwdBtnOvr);
eleNavBox.appendChild(elePthFwdBtn);
eleNavBox.appendChild(eleUiHelix);

//-------------------- Get the html body tag and put everything inside it. --------------------//
const main = document.body;
main.appendChild(eleNavPos);