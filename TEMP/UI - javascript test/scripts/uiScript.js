//Create a paragraph element and add text to it.

//eleUiContainer = document.createElement("div");
//eleUiContainer.className = "ui-container";

const eleNavBox = document.createElement("nav");
eleNavBox.className = "ui-box";

const eleUiImage = document.createElement("img");
eleUiImage.src = "images/ui/ui-test.png";

//Append the elements to one another.
eleNavBox.appendChild(eleUiImage);
eleUiContainer.appendChild(eleNavBox);

//Get the html body tag and put everything inside it.
const main = document.body;
main.appendChild(eleUiContainer);