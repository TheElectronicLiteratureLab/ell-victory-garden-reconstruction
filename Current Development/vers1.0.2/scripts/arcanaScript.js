screenArray = new Array("","","","","","","","","","","");
outCount = 0;
wedgeLock = false;
wedgeCount = 0;
theStyle = "background-color: white;"
fauxTab = "&nbsp;&nbsp;&nbsp;&nbsp;";

function writeNow(){

	document.getElementById('out').innerHTML = "";
	for(var i=0; i<screenArray.length; i++){
		document.getElementById('out').innerHTML += screenArray[i];
	}
	writeIn = geppetto() + " ";
	screenArray.push(writeIn);
	screenArray.shift();
	screenDelay = setTimeout(writeNow,1000);
}

function geppetto(){
	switcher = Math.floor(Math.random()*25);
	//switcher = 24;
	if(wedgeLock == true) switcher = 9;
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
			//WORD GRAB!
			t = grabber() + " ";
			break;
		case 7:
			//HEADLINES
			t = headCase();
			break;
		case 8:
			//PAGE NUMBER
			t = pager();
			break;
		case 9:
			//'WEDGIE'
			t = wedgie();
			break;
		case 10:
			//HASHTAG YOU'RE IT
			t = "#" + allCap(g(wordMass));
			break;
		case 11:
			//WORDMASS LINKED TO RANDOM PAGE IN TEXT
			t = "<a href='javascript: forwardAnywhere()'><strong>" + allCap(g(wordMass)) + "</strong></a>";
			break;
		case 12:
			//RE-USING THOSE GLUONS
			t = "... " + g(gluons) + " ...";
			break;
		case 13:
			//DOES MY ASTERISK LOOK BIG IN THIS?
			t = "<br><span style='font-size: 32pt'>" + g(bangers) + "</span><br>";
			break;
		case 14:
			//THIS STORY IS ABOUT...
			t = bookReporter();
			break;
		case 15:
			//AND THEN (ANARCHRONISMS)
			t = gString("All this was before,So then&comma;,In the future&comma;,In days to come&comma;,Later on&comma;,And then much later&comma;,In later days&comma;,Much afterwards&comma;,Then,Afterwards&comma;,Down the road&comma;");
			t += " " + g(anachronisms) + ".";
			break;
		case 16:
			//VECTORIAL
			t = vectorial();
			break;
		case 17:
			//WHAT WE HAVE LEARNED
			t = learning();
			break;
		case 18:
			//INTERJECT
			t = "..." + g(interjections) + "... "
			break;
		case 19:
			//STATUS STAT
			t = statUs();
			break;
		case 20:
			//PLAIN AND SIMPLE!
			t = formCheck(g(arcanaText));
			break;
		case 21:
			//WORDSTACK
			t="<br>";
			for(var i=0; i<1+r(7); i++){
				for(var j=0; j<i+2; j++){
					t += fauxTab;
				}
				t += wordUp() + "<br>"
			}
			t +="<br>";
			break;
		case 22:
			//PLACE IT
			t = hereWeAre();
			break;
		case 23:
			//YOU ARE SEEN
			if(r(2) == 0){
				t = gString("I,We,They") + " see ";
			}
			else{
				t = "The " + gString("screen,machine,system,text") + " sees ";
			}
			for (var i=0; i< 1 + r(3); i++){
				t += g(firstNames) + " and "			
			}
			t += g(firstNames) + ".";
			return t;
			break;
		case 24:
			//CRITICALITIES
			t = reviewIt();
			break;
	}
	//COLORIZE!?
	if(r(10) == 5) t = "<span style='color: " + g(theColors) + ";'>" + t + "</span>"
	if(r(3) == 0 && wedgeLock == false) t += "<br><br>";
	return t;
}

function reviewIt(){
	rev = "<br><br>'" + allCap(g(adjectives)) + "' -- ";
	rev += g(towns) + ", " + gString(states) + " <em>"
	if(r(3) == 0) rev += gString("Mathematician-,News-,Commerical ,Independent ,Mail and ,People&apos;s ,Democrat-,Post and ,Investigator-,Ombudsman-,Dime-,Advertiser-,Journal-,Journalist-,Local ,Municipal ,Circulator-,Hindu-");
	rev += gString("Atheist,Agnostic,American,Columbian,Settler-Colonialist,Methodist,Believer,Democrat,Republican,Free Soiler,Bargain Hunter,Coupon Clipper,Pet Finder,Anarchist,Gazette,Announcer,Star,Asteroid,Satellite,Rocket,Advance,Retreat,Inquirer,Skeptic,Denier,Tattletale,Nightly,Itinerant,Meddler,Enigma,Reliable Dealer,Newspot,Soothsayer,Hygienist,Cosmopolitan,Universe,Multiverse,Verifier,Blogfest,Digest,Argus,Planet,Herald,Reporter,Auditor,Reader,Zeitschrift,Printwad,Reposter,Blotter,Hobbyist,Collector,Hoarder,Slab,Letters,Forum,Medium,Massage,Paper,Item,Typesetter,Call,Message,Reprimand,Reprobate,Gossip,Regulator,Classifier,TL:DR")
	return "</em>" + rev + ".<br><br>";
}

function hereWeAre(){
	loc = "[" + gString("This text accessed,Reading has occurred,Reading activity detected,Reading suspected,A reader exists,A putative reader has been found,Reading occurs,There is no reader,Reading not detected,Failed to connect,Absence of attention");
	switch(r(3)){
		case 0:
			//IP
			loc += " at ";
			loc += r(255)+"."+r(255)+"."+r(255)+"."+r(255);
			break;
		case 1:
			//TOWNS
			loc += " in "
			if(r(2 == 0)) {
				loc += g(towns)	+ ", "	
			}
			else{
				loc += toCap(g(wordMass)) + ", "
			}
			loc += gString(states) 
			break;
		case 2:
			//DESCRIPTIVE
			if(r(2 == 0)) loc += " " + gString("at least once,recently,verifiably,plausibly,allegedly,nominally,quite possibly")
			loc += " in "
			loc += gString("perplexity,confusion,befuddlement,semi-stupor,bed,regret,someone else&apos;s bed,dread,something like sympathy,something not actually sympathy,the rain,a funk,a fog,a gormless condition,deep illusion,idleness,lost moments,a crazy dream");
			break;
	}
	return loc + ".]";
}

function startRain1(){
	d1 = document.getElementById('drop1');
	d1OnStage = false;
	d1.style.left = 50 + r(500);
	d1.style.top = 0 - r(1200);
	d1.style.opacity = 1;
	d1FloatSpeed = 2;
	d1.innerHTML = grabber();
	textReign = setTimeout(tDrizzle,35)	
}

function startRain2(){
	d2 = document.getElementById('drop2');
	d2OnStage = false;
	d2.style.left = 50 + r(500);
	d2.style.top = 0 - r(1200);
	d2.style.opacity = 1;
	d2FloatSpeed = 2;
	d2.innerHTML = grabber();
	//NO NEED TO START DRIZZLE HERE
}

//ANIMATE THE TEXTDROPS
function tDrizzle(){
	d1 = document.getElementById('drop1');
	d2 = document.getElementById('drop2');
	d1.style.opacity -= 0.009;
	d2.style.opacity -= 0.009;
	d1Top = parseInt(d1.style.top);
	d2Top = parseInt(d2.style.top);
	d1Top += d1FloatSpeed;
	d2Top += d2FloatSpeed;
	d1FloatSpeed += r(5)/10
	d2FloatSpeed += r(5)/10
	d1.style.top = d1Top;
	d2.style.top = d2Top;
	//ONSTAGE SET
	if(d1Top > 0 && d1Top < window.innerHeight) d1OnStage = true;
	if(d2Top > 0 && d2Top < window.innerHeight) d2OnStage = true;
	//OFFSTAGE TEST
	if(d1OnStage == true && (d1Top > window.innerHeight + 200 || d1Top < -200)){
		startRain1();
	}
	else{ //RECYCLE
		textReign = setTimeout(tDrizzle,35)
	}
	if(d2OnStage == true && (d2Top > window.innerHeight + 200 || d2Top < -200)){
		startRain2();
	}
}


function statUs(){
	su = "<br><br>" + gString("WORDS,TOKENS,CHARACTERS,IDEOMES,MICROMEMES,SPEECH ACTS,PAGES") + " ";
	if(r(3) == 0) su += "NOT ";
	su += gString("PROCESSED,ASSIMILATED,ENCOUNTERED,IGNORED,BYPASSED,CONVERGED,RENDERED,SPEEDREAD") + ": ";
	su += r(500000) + ".<br><br>";
	return su;
}

function learning(){
	tl = gString("WE HAVE LEARNED,FACTS DETERMINED,TRUTHS ESTABLISHED,REALITIES FACED,STUFF ENCOUNTERED,FACTS FACTORED") + ": ";
	switch(r(4)){
		case 0:
			tl += g(learnings);	
			break;
		case 1:
			tl += gString("Amazon,Google Fictions,Global Attention Index,UNICEF Human Interest,Meta Memetics") + " rank ";
			tl += gString("&#9206;,&#9207;,&#9205;") + (10000000*r(10)) + r(100);
			break;
		case 2:
			tl += "Intrinsic value (inflation-adjusted) " + gString("&euro;,&yen;,&dollar;,&pound;") + "0.000000" + r(1000);
			break;
		case 3:
			tl += massEffect();
			break;
	}
	return tl + ".";
}

function vectorial(){
	tv = "<tt>-- The " + gString("current,present,operative,salient,onstream,upstream,stream crossing,here-and-now") + " vector ";
	tv += gString("is,converges to,asymptotalizes as,might be called,kinda looks like,equals,is less than equal to,wants to be") + " ";
	if(r(2) == 0){
		tv += r(1000) + "." + r(1000) + "." + r(1000);
	}
	else{
		tv += allCap(g(wordMass));
	}
	return tv + " -- </tt>";
}

function bookReporter(){
	br = "<em>"
	switch(r(3)){
		case 0:
			br += "This " + gString("fiction,thing that isn't a novel,hypertext,web,joint,mess") + " ";
			br += gString("is,talks,goes on,has a lot of stuff in it,seems obsessed,appears to be, is mainly,says some things,wants to tell us") + " about "
			br += "</em><strong>" + allCap(g(topics)) + "</strong>";
			break;
		case 1:
			br += "<strong>" + allCap(gString("Boris,Emily,Thea,Veronica,Leroy,Miles,Jude,Amanda,Tate,Agent Madden,Victor,Heidel,Billy Van Saxgutter"));
			br += "</strong> is a " + gString("character,madeup person,name,wordmass") + " in ";
			br += gString("this crazy hypertext,this weird fiction,this thing that is definitely not a novel,</em>Victory Garden");
			break;
		case 2:
			br += gString("I read a lot,Among the things I read was,There are many words here")
			br += " about " + "</em><strong>" + allCap(g(topics)) + "</strong>";
			break;
	}
	if(r(4) == 0){
		br += "?";
	}
	else{
		br += ".";
	}
	return br;
}

function startFloat(){
	flot = 	document.getElementById('floater');
	onStage = false;
	floatDir = "down";
	if(r(2) == 0) floatDir = "up";
	if(floatDir == "down") flot.style.top = -200-r(200);
	if(floatDir == "up") flot.style.top = window.innerHeight+200+r(200);
	flot.style.left = 50 + r(500);
	theRot = r(25);
	rotAmt = 0.35;
	rotDir = "left";
	if(r(2) == 0) rotDir = "right";
	if(r(2) == 0) theRot *= -1;
	flot.style.transform = 'rotate(' + theRot + 'deg)';
	//COLORS
	switch(r(7)){
		case 0:
			flot.style.color = '#FFFFFF';
			flot.style.backgroundColor = '#000000';
			break;
		case 1:
			flot.style.color = 'yellow';
			flot.style.backgroundColor = 'orange';
			break;
		case 2:
			flot.style.color = 'red';
			flot.style.backgroundColor = 'DarkGreen';
			break;
		case 3:
			flot.style.color = 'yellow';
			flot.style.backgroundColor = 'violet';
			break;
		case 4:
			flot.style.color = 'purple';
			flot.style.backgroundColor = 'gold';
			break;
		case 5:
			flot.style.color = 'cyan';
			flot.style.backgroundColor = 'DarkGreen';
			break;
		case 6:
			flot.style.color = 'Green';
			flot.style.backgroundColor = 'magenta';
			break;
	}
	flot.style.opacity = 0.75;
	floatSpeed = 2;
	flot.innerHTML = modUp();
	floatie = setTimeout(doFloat,35)	
}

function doFloat(){
	flot = document.getElementById('floater');
	theTop = parseInt(flot.style.top);
	if(floatDir == "down") theTop += floatSpeed;
	if(floatDir == "up") theTop -= floatSpeed;
	floatSpeed += 0.05
	flot.style.top = theTop;
	if(rotDir == "right") theRot += rotAmt;
	if(rotDir == "left") theRot -= rotAmt;
	rotAmt += 0.025;
	flot.style.transform = 'rotate(' + theRot + 'deg)';
	//ONSTAGE SET
	if(theTop > 0 && theTop < window.innerHeight) onStage = true;
	//OFFSTAGE TEST
	if(onStage == true && (theTop > window.innerHeight + 200 || theTop < -200)){
		startFloat();
	}
	else{ //RECYCLE
		floatie = setTimeout(doFloat,35)
	}
}

function modUp(){
	theMod = g(modWords) + " " + r(3000);
	if(r(3) == 0) theMod +=" " + g(modVerbs) + " TO " + g(modulus);
	return theMod;
}

function spanner(what){
	switch(r(5)){
		// BOX OUTLINE
		case 0:
			theStyle = 'outline: 1px solid; padding: 1px;'
			break;
		case 1:
			// PASTEL HIGHLIGHT
			theStyle = "background-color: " + g(highlights) + ";";
			break;
		case 2:
			//WHITE ON BLACK
			theStyle = "background-color: black; color: white;";
			break;
		case 3:
			//REDACTION - BLACK, RED, BLUE
			what = "&nbsp;&curren; " + g(redactors) + " &curren;&nbsp;";
			redactColors = ("DarkRed,DarkBlue,DarkRed,Gray");
			theStyle = "background-color: " + gString(redactColors) + "; color: white";		
			break;
		case 4:
			//RAINBOW LETTERING
			rb = "";
			for(var i=0; i<what.length; i++){
				rb += "<span style= 'color: " + g(theColors) + ";'>" + what.charAt(i) + "</span>";
			}
			what = rb;
			theyStyle = "background-color: white;";
			break;
		}
	return "<span style ='" + theStyle + "'>" + what + "</span>";
}

function wedgie(){
	//SET LOCK
	if(wedgeLock == false){
		wedgeLock = true;
	//GET SOURCE WORD FROM WORDMASS
		theWord = g(wordMass);
		//OR TAKE FROM SENTENCES
		if(r(2) == 0){
			theWord = "";
			while(theWord.length < 7 || theWord.length > 12){
				theWords = getSentence().split(" ");
				theWord = g(theWords);
			}
		}
	}

	//OUTPUT
	wedgeOut = theWord.substring(0,wedgeCount);
	if(wedgeCount == 0){
		wedgeOut += "<br><br>";
	}
	else{
		wedgeOut += "<br>";
	}
	wedgeCount += 1 + r(3);
	if(wedgeCount >= theWord.length+1){
		wedgeLock = false;
		wedgeCount = 0;
		wedgeOut = "<strong>" + allCap(theWord) + "</strong><br><br>"
	}
	return wedgeOut;
}

function headCase(){
	headCheese = "";
	switch(r(3)){
		case 0:
			headCheese = g(headMatter);
			break;
		case 1:
			headCheese = toCap(g(wordMass));
			break;
		case 2:
			headCheese = allCap(g(interjections));
			break;
	}
	if(r(4) == 0) headCheese = "<h2>" + headCheese + "</h2>";
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

function wordUp(){
	upWord = "word";
	breakerCount = 0;
	grabArray = getSentence().split(" ");
	while(upWord.length < 6 && breakerCount<100){
		upWord = g(grabArray)
		breakerCount ++;
	}
	return upWord;
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
	return spanner(massy);
}

function getSentence(){
	thePick = arcanaText[Math.floor(Math.random()*arcanaText.length)];
	if(r(5) == 0){
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