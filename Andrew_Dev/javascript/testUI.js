
//Create a paragraph element and add text to it.
const para = document.createElement("p");
const node = document.createTextNode("New Content.");
para.className = "sand";
para.appendChild(node);


//Get the html body tag and put everything inside it.
const main = document.body;
main.appendChild(para);