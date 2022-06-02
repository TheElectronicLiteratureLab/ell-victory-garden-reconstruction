screenArray = new Array("","","","","","","","","","","");
outCount = 0;
function writeNow(){

	document.getElementById('out').innerHTML = "";
	for(var i=0; i<screenArray.length; i++){
		document.getElementById('out').innerHTML += screenArray[i];
	}
	writeIn = geppetto() + " ";
	if(r(3) == 0) writeIn += "<br><br>";
	screenArray.push(writeIn);
	screenArray.shift();
	screenDelay = setTimeout(writeNow,1000);
}

function geppetto(){
	switcher = Math.floor(Math.random()*12);
	t = "";
	switch(switcher){
		case 0:
			//simple sentence pull
			t = formCheck(getSentence());
			break;
		case 1:
			//2-splice
			t = formCheck(twoSplice());
			break;
		case 2:
			//pull from wordmass (Stromatolite)
			t = massEffect();
			break;
		case 3:
			//sentence with repetitions
			t = repNoise() + ".";
			break;
		case 4:
			//alphanumeric noise generator
			t = noiseGen();
			break;
		case 5:
			// @ various figures, including VG characters
			t = atter();
			break;
		case 6:
			//word grabs
			t = grabber();
			break;
		case 7:
			//headlines, in-line or H2
			t = headCase();
			break;
		case 8:
			//page number
			t = pager();
			break;
		case 9:
			//MODULE etc.
			t = "<br><tt><strong>" + g(modWords) + " " + r(3000);
			if(r(3) == 0) t +=" " + g(modVerbs) + " TO " + g(modulus);
			t += "</strong></tt><br>";
			break;
		case 10:
			//hashtag
			t = "#" + allCap(g(wordMass));
			break;
		case 11:
			//WORDMASS LINKED TO RANDOM PAGE IN TEXT
			t = "<a href='javascript: forwardAnywhere()'><strong>" + allCap(g(wordMass)) + "</strong></a>";
			break;
		case 12:
			//RE-USING THOSE GLUONS
			t = g(gluons);
			break;
	}
	//COLORIZE!?
	if(r(10) == 5) t = "<span style='color: red'>" + t + "</span>"
	return t;
}

function headCase(){
	headCheese = "";
	if(r(3) == 0){
		headCheese = g(headMatter);
	}
	else{
		headCheese = toCap(g(wordMass));
	}
	if(r(5) == 0) headCheese = "<h2>" + headCheese + "</h2>";
	return headCheese;
}

function atter(){
	atsy = "@";
	if(r(2)==0){
		atsy += g(whoIs);
	}
	else{
		atsy += g(firstNames) + " " + g(lastNames);
	}
	return atsy;
}

function pager(){
	pageTurn = "";
	pageNum = r(1038);
	switch(r(4)){
		case 0:
			pageTurn = "END OF PAGE " + pageNum + ".";
			break;
		case 1:
			pageTurn = "PAGE " + pageNum + " BEGINS:";
			break;
		case 2:
			pageTurn = "MEANWHILE ON PAGE " + pageNum + "... ";
			break;
		case 3:
			pageTurn = gString("THUS,SO,HERE,ANYWAY") + " " + gString("ENDS,BEGINS,CONTINUES") + " PAGE " + pageNum + "."
			break;
	}
	return pageTurn + " ";
}

function grabber(){
	grabbed = "";
	runLimit = 5 + r(6);
	for(var i=0; i<runLimit; i++){
		grabArray = getSentence().split(" ");
		grabbed += g(grabArray) + " ";
	}
	grabbed += g(grabArray);
	return formCheck(grabbed);
}


function noiseGen(){
	theNoise = "";
	if(r(2) == 0){
		for(var i=0; i< 5+r(8); i++){
			theNoise += g(alphaNum);
		}
	}
	else{
		theNoise = g(noises) + "!";
	}

	theNoise = " " + theNoise;
	return theNoise;
}

function repNoise(){
	sourceSent = g(repEms);
	repOut = ""
	repArray = sourceSent.split(" ");
	for(var i=0; i<repArray.length; i++){
		for(var q=0; q<1+r(3); q++){
			repOut += repArray[i] + " ";
		}
	}
	repOut += allCap(g(wordMass));
	return repOut;
}

function massEffect(){
	massy = " ";
	massLength = 2 + r(5);
	for(var i=0; i<massLength; i++){
		massPick = g(wordMass);
		if(r(2) == 0) massPick = allCap(massPick);
		massy += massPick + " ";
	}
	return massy;
}

function getSentence(){
	thePick = arcanaText[Math.floor(Math.random()*arcanaText.length)];
	if(r(3) == 0){
		thePick = reverser(thePick);
	}

	return (thePick);
}

function twoSplice(){
	splicing = ""
	sent1 = getSentence();
	sent2 = getSentence();
	part1 = "";
	part2 = "";
	//SPLIT BOTH SENTENCES INTO ARRAYS
	array1 = sent1.split(" ");
	array2 = sent2.split(" ");
	//GET FIRST HALF OF SENTENCE 1
	sent1Half = Math.floor(array1.length/2)
	//SAME FOR SENTENCE 2
	sent2Half = Math.floor(array2.length/2)
	//CONSTRUCT FIRST HALF
	for(var i=0; i<sent1Half; i++){
		part1 += array1[i] + " ";
	}
	//CONSTRUCT SECOND HALF
	for(var i=sent2Half; i<array2.length; i++){
		part2 += array2[i] + " ";
	}

	if(r(3) == 0){
		splicing = part1 + " &#" + gString(emojis) + "; " + part2;
	}
	else{
		splicing = part1 + part2;
	}
	return splicing;
}

function formCheck(sent){
	//TRIM TRAILING SPACE IF ANY
	if(sent.charAt(sent.length-1) == " ") sent = sent.substring(0,sent.length-1);
	//FIX INITIAL CAPITALIZATION
	stubSent = sent.substring(1,sent.length);
	fixit = true;
	firstCharCode = sent.charCodeAt(0);
	if(firstCharCode > 96) firstCharCode -=32;
	sent = String.fromCharCode(firstCharCode) + stubSent;
	//CHECK FOR TERMINAL PUNCTUATION
	lastChar = sent.charAt(sent.length-1);
	if(lastChar == "." || lastChar == "?" || lastChar =="!") fixit = false;
	if(fixit == true) sent += ".";
	return sent;
}

function reverser(revS){
	backOut = "";
	yarra = revS.split(" ").reverse();
	//DECAPITALIZE LAST CHAR (WAS FIRST)
	yarra[yarra.length-1] = unCap(yarra[length-1]);
	//ASSEMBLE OUTPUT STRING
	for(var i=0; i<yarra.length-2; i++){
		backOut += yarra[i] + " ";
	}
	backOut += yarra[yarra.length-2];
	
	return backOut;

}

function toCap(tcString){
	//CAPITALIZES FIRST LETTER OF GIVEN STRING
	theStub = tcString.substring(1,tcString.length);
	theCharCode = tcString.charCodeAt(0);
	//OPERATE ONLY ON LOWERCASE LETTERS
	if(theCharCode >96 && theCharCode < 123) theCharCode -=32;
	return String.fromCharCode(theCharCode) + theStub;
}

function allCap(acString){
	cappy = "";
	for(var i=0; i<acString.length; i++){
		charNum = acString.charCodeAt(i);
		if(charNum > 96) charNum -= 32;
		cappy += String.fromCharCode(charNum);
	}
	return cappy;
}

function unCap(ucString){
	//LOWERCASES FIRST LETTER OF GIVEN WORD
	if(ucString != undefined){
	theStub = ucString.substring(1,ucString.length);
	theCharCode = ucString.charCodeAt(0);
	//DON'T DO IF ALREADY A LOWERCASE LETTER
	if(theCharCode < 96 && theCharCode <123) theCharCode +=32;
	return String.fromCharCode(theCharCode) + theStub;
	}
}

function gString(what){
	gStringArray = what.split(",");
	return gStringArray[Math.floor(Math.random()*gStringArray.length)];
}

function g(what){
	return what[r(what.length)];
}

function r(range){
	return Math.floor(Math.random()*range);
}