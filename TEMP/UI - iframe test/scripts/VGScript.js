//SET UP OVERRIDE VARIABLE
override = "";

/*
if (window.parent != window.top) {
	//ONLY RUNS ON THE PAGE THAT IS EMBEDDED INSIDE AN IFRAME
  	currPage = shortNamer()
	window.parent.document.getElementById("mainIframe").src = currPage;
	alert(currPage);
}
*/


//SET LISTENER FOR PATH & STREAM KEYS
window.addEventListener('keyup', function(event) {
  // NUMBER 13 IS "RETURN"; NUMBER 17 IS "CONTROL"
  if (event.keyCode == 13){
  	pathFinder()
  	moveInWork()
  }
  if(event.keyCode == 17){
  	streamLiner()	
  	moveInWork()
  } 
}); 

//ENABLE RANDOM SELECTION IN 'LABYRINTH' SECTION
//ACTUALLY THIS COULD WORK FOR LARGER OPTION SETS AS WELL!
function labFlip(overString)
{
		//OVERRIDE CHECK IN PATH AND STREAM DETECTS TILDE CHAR AND HANDS OFF TO THIS FUNCTION
		thePair = overString.substring(1,overString.length)
		flipArray = thePair.split(',');
		return flipArray[Math.floor(Math.random()*flipArray.length)];
}

//HANDLE STREAMS
function streamLiner()
{
	//CHECK FOR LOCAL OVERRIDE
	//FIRST CHECK FOR SPECIAL 'LABYRINTH' OVERRIDE - RANDOM CHOICE
	if(override != ""){
		if(override.charAt(0) == "~"){
			dest = labFlip(override);
		}
		else{
			dest = override;
			override = "";
		}
	}
	else{
		//NO OVERRIDE - LOOK FOR STREAM MATCH
		//GET NAME OF THIS PAGE MINUS FILE EXTENSION
		thisPage = shortNamer();
		//CLEAR KEY VARIABLES
		dest = "";
		searchArray = ""
		//SEARCH ALL STREAMS TO FIND STREAM INCLUDING THIS SPACE
		for(var i=0; i<allStreams.length; i++){
			//IF ARRAY INCLUDES PAGE, USE THE ARRAY
			if(allStreams[i].includes(thisPage)) searchArray = allStreams[i];
		}
		if(searchArray == ""){
			//NOT ALL PAGES ARE IN STREAMS!
			dest = "Streamlines"
		}
		else{
			//FOUND A STREAM
				for(var i=0; i<searchArray.length; i++){
					//DETERMINE POSITION OF MATCH IN ARRAY
					if(searchArray[i] == thisPage) thePos = i;
				}
					//IF FINAL ITEM, GO TO 'STREAMLINES' PAGE
					if(thePos == searchArray.length-1){
					dest = "Streamlines"
				}
				else{
					//IF NOT FINAL, DEST IS NEXT PAGE IN ARRAY
					dest = searchArray[thePos + 1]
				}
		}

	}
	//PROCEED TO DESTINATION
	targetlocation = dest + ".html";
	return targetlocation;
}

//HANDLE PATHS
function pathFinder()
{	
	//PATHS REQUIRE SETUP ON INDEX PAGE, BUT PAGES MAY BE ACCESSED INDEPENDENTLY
	//SO WE CHECK THE SETUP AND SKIP TO END IF IT HASN'T BEEN DONE
	if(sessionStorage.getItem('currentPath') != null)
	{
			dest = "";
			//CONVERT STORED PATH STRING TO ARRAY
			pathString = sessionStorage.getItem('currentPath')
			thePathArray = pathString.split(',')	
			//CHECK FOR LOCAL OVERRIDE
			//FIRST CHECK FOR SPECIAL 'LABYRINTH' OVERRIDE - RANDOM CHOICE
			if(override != ""){
				if(override.charAt(0) == "~"){
					dest = labFlip(override);
				}
				else{
					dest = override;
					override = "";
				}
			}
			//NO OVERRIDE
			else{
				//GET PATHCOUNT
				thePathCount = parseInt(sessionStorage.getItem('pathCount'))
				//HAVE WE FINISHED THE PATH?
				if(thePathCount == thePathArray.length){
					//GO TO ENTRY PAGE AND START NEW SESSION
					dest = "index"
				}
				else{
					//EITHER LOOP OR CONTINUE
					dest = thePathArray[thePathCount]
					//LOOP IF INDICATED - LOOPING PATHS DO NOT END
					if(dest.charAt(0) == "*"){
						//LOOP POSITION SET BY CHARACTERS FOLLOWING "*"
						loopString = parseInt(dest.substring(1,dest.length))
						loopNum = parseInt(loopString);
						dest = thePathArray[loopNum]
						loopNum ++; //PREVENT LOOP ENTRY NODE FROM REPEATING
						loopString = parseInt(loopNum)  //PERHAPS UNNECESSARY
						sessionStorage.setItem('pathCount', loopString);
					}
					else{
					//NO LOOP, NOT AT END OF PATH
						thePathCount ++;
						sessionStorage.setItem('pathCount', thePathCount.toString());				
					}
				}
			}
		}
		else{
			//WE'RE HERE BECAUSE PAGE WAS ACCESSED WITHOUT GOING THROUGH INDEX.HTML
			//SO THAT'S WHERE WE'RE GOING, EH
			dest = "index";
		}
	//PROCEED TO DESTINATION
      
	targetlocation = dest + ".html";
	return targetlocation;
}

//TRACK READING HISTORY
function historicize()
{
	thePage = shortNamer();
	//RETRIEVE HISTORY FROM LOCAL STORAGE
	currHist = sessionStorage.getItem('VGH');
	//CATCH ERROR IF CURRHIST IS NULL (PAGE ACCESSED W/O INDEX PAGE)
	if(currHist === null) currHist = "index"
	//ADD THIS PAGE TO HISTORY IF NOT ALREADY THERE
	if(!currHist.includes(thePage)) currHist += thePage + ','
	sessionStorage.setItem('VGH',currHist)
}

//SCRUB FILE EXTENSION FROM PAGE NAMES
function shortNamer()
{
	//CHECK TO SEE IF THE ACTIVE PAGE (WHERE THE COMMAND TRIGGERED FROM) IS THE UI OR THE WORK
	//SET THIS URL TO THE MAIN PAGE THAT HOLDS THE UI
	if (location.href.split("/").slice(-1) == "main-ui.html")
	{
		//GET SRC OF THE IFRAME
		pn = document.getElementById("mainIframe").src.split("/").slice(-1);
		pn = pn.toString();
		//REMOVE 4-LETTER FILE EXTENSION
		pn = pn.substring(0,pn.length-5)
		return pn
	}
	else
	{
		//GET NAME OF THIS PAGE
		pn = location.href.split("/").slice(-1);
		pn = pn.toString();
		//REMOVE 4-LETTER FILE EXTENSION
		pn = pn.substring(0,pn.length-5)
		return pn
	}
}


//MOVE TO THE ASSIGNED PAGE (FROM INSIDE THE WORK)
function moveInWork()
{
	location = targetlocation;
}

//MOVE TO THE ASSIGNED PAGE (FROM THE UI)
function moveFromUI()
{
	document.getElementById("mainIframe").src = targetlocation;
}

function onTriggerUI()
{
	//GET THE CURRENT PAGE INSIDE THE IFRAME AND SET IT AS THE IFRAME SRC
	//alert("trigger");
	//alert(document.getElementById("mainIframe").contentWindow);
	//document.getElementById("mainIframe").src = currPage;
}
