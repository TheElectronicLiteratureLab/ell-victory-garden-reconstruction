//SET UP OVERRIDE VARIABLE
override = "";

//SET LISTENER FOR PATH & STREAM KEYS, FWD AND REV
//UP IS PATH FWD; DOWN IS PATH REV; RIGHT IS STREAM FWD, LEFT  IS STREAM REV
//KEEPING 'ENTER' and 'CTRL' AS WELL

window.addEventListener('keyup', function(event) {
  if(event.keyCode == 37) streamLiner('rev'); 
  if(event.keyCode == 38) pathFinder('fwd');
  if(event.keyCode == 39) streamLiner('fwd'); 
  if(event.keyCode == 40) pathFinder('rev');
  if(event.keyCode == 17) streamLiner('fwd');
  if(event.keyCode == 13) pathFinder('fwd');
});

function transit(dest){
	//INDEX PAGE IS SPECIAL CASE
	if(dest == "index"){
		window.open("index.html", "_parent")
	}
	else{
		window.open(dest + ".html", "_self")
	}
}

//REPORT PATH AND STREAM IN 'TOPPER' DIV
function pageStart()
{
	//SOME PAGES DON'T HAVE THE HEADER
	if(document.getElementById('topper') != null)
	{
		//SET DEFAULT VALUES FOR THE HEADER LINKS - MAY BE RESET BELOW
		pathHead = 'Pathfinder.html';
		streamHead = 'Streamlines.html'

		//PATH
		//DETERMINE NAME OF CURRENT PATH
		thePath = sessionStorage.getItem('currentPath');
		if(thePath == null) //THIS PAGE WAS ACCESSED OUT OF SEQUENCE - SET DEFAULT PATH
		{
			thePathName = "Grand";
			//THESE LINES SEEM NOT TO HAVE EFFECT
			//SOMETHING IN PATHFINDER PROBABLY OVERRIDES THEM FOR NON-SEQUENCE PAGES:
			//FORCES TRANSITION TO INDEX - MAY NEED TO ADDRESS THIS FOR TESTING
			sessionStorage.setItem('currentPath', grand);
			sessionStorage.setItem('pathCount', '0')
		}
		else //WE'RE ALREADY ON A PATH - IDENTIFY IT
		{
			pathNamesArray = pathNames.split(',')
			for(var i=0; i<allPaths.length; i++)
			{
				if(allPaths[i] == thePath)
				{
					thePathName = pathNamesArray[i];
					//SPLIT PATH DATA TO ARRAY, PULL FIRST ITEM (PATHHEAD)
					currPathArray = thePath.split(',');
					pathHead = currPathArray[0] + '.html';
				}	
			}			
		}
		
		//STREAM
		//DEFAULT VALUE FOR PAGES NOT IN A STREAM (THERE ARE SOME)
		theStream = "Victory Garden";
		thisPage = shortNamer();
		//SEARCH ALL STREAMS TO FIND STREAM INCLUDING THIS SPACE
		for(var i=0; i<allStreams.length; i++){
			//IF ARRAY INCLUDES PAGE, USE ASSOCIATED STREAM NAME
			if(allStreams[i].includes(thisPage))
			{			
				//NAME THAT STREAM
				theStream = streamNames[i];
				currStream = allStreams[i]
				streamHead = currStream[0] + ".html";
			}

		}
		//WRITE THE HEADER
		//SET COLORS TO REFLECT TRANSITMODE
		pathColor = '#b09f82';
		streamColor = '#b09f82';
		if(sessionStorage.getItem('transitMode') == 'path') pathColor = '#FF0000';
		if(sessionStorage.getItem('transitMode') == 'stream') streamColor = '#FF0000';
		document.getElementById('topper').innerHTML = "<a class='topLink' href=" + pathHead + " style='color:" + pathColor +"''>" + thePathName + "</a> &middot; " + "<a class='topLink' href=" + streamHead + " style='color:" + streamColor + "'>" + theStream + "</a>";
		//RESET TRANSITMODE TO NULL
		sessionStorage.setItem('transitMode', '');
		//*** FOR TESTING ***
		document.getElementById('topper').innerHTML += " *** " + sessionStorage.getItem('pathCount');
	}
}


//ENABLE RANDOM CHOICE OF DUAL OPTIONS IN 'LABYRINTH' SECTION
//ACTUALLY THIS COULD WORK FOR LARGER OPTION SETS AS WELL!
function labFlip(overString)
{
		//OVERRIDE CHECK IN PATH AND STREAM DETECTS TILDE CHAR AND HANDS OFF TO THIS FUNCTION
		thePair = overString.substring(1,overString.length)
		flipArray = thePair.split(',');
		return flipArray[Math.floor(Math.random()*flipArray.length)];
}

//HANDLE STREAMS
function streamLiner(dir)
{
	//SET TRANSITMODE TO 'STREAM'
	sessionStorage.setItem('transitMode', 'stream');

	//CHECK FOR LOCAL OVERRIDE - DIR DOES NOT MATTER
	//FIRST CHECK FOR SPECIAL 'LABYRINTH' OVERRIDE (RANDOM CHOICE)
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
		searchArray = "";
		//SEARCH STREAMS TO FIND STREAM INCLUDING THIS SPACE
		for(var i=0; i<allStreams.length; i++){
			//IF ARRAY INCLUDES THIS PAGE, USE THE ARRAY
			if(allStreams[i].includes(thisPage)) searchArray = allStreams[i];
		}
		if(searchArray == ""){
			//NOT ALL PAGES ARE IN STREAMS! - JUMP TO END OF SCRIPT
			dest = "Streamlines"
		}
		else{
			//FOUND A STREAM
				for(var i=0; i<searchArray.length; i++){
					//DETERMINE POSITION OF MATCH IN ARRAY
					if(searchArray[i] == thisPage) thePos = i;
				}
					//FORWARD OR BACKWARD?
					if(dir == 'fwd'){
						//MOVING FORWARD!
						//IF AT FINAL PAGE OF STREAM, GO TO 'STREAMLINES'
						if(thePos == searchArray.length-1){
							dest = "Streamlines";
						}
						else{
							//GO TO NEXT PAGE IN STREAM
							dest = searchArray[thePos + 1];
						}
					}
					else{
					//BACKWARD IT IS!
						//IF AT FIRST PAGE OF STREAM, GO TO 'STREAMLINES'
						if(thePos == 0){
							dest = "Streamlines";
						}
						else{
							//GO TO PREVIOUS PAGE IN STREAM
							dest = searchArray[thePos - 1];
						}
					}
				}
		}
	//PROCEED TO DESTINATION
	transit(dest);
}

//HANDLE PATHS
function pathFinder(dir)
{	
	//SET TRANSITMODE TO 'PATH'
	sessionStorage.setItem('transitMode', 'path');

	//PATHS REQUIRE SETUP ON INDEX PAGE, BUT PAGES MAY BE ACCESSED INDEPENDENTLY
	//SO WE CHECK THE SETUP AND SKIP TO END IF IT HASN'T BEEN DONE
	if(sessionStorage.getItem('currentPath') == null)
	{
		dest = pathFinder; // NOW GO STRAIGHT TO TRANSIT CALL AT BOTTOM
	}
	else //THERE IS A WORKING PATH; ADVANCE OR REVERSE
	{
		dest = "";
		//SET UP PATH ARRAY FROM STORED STRING
		pathString = sessionStorage.getItem('currentPath')
		thePathArray = pathString.split(',')	
		//CHECK FOR OVERRIDES
		if(override != "")
		{
			//FIRST CHECK FOR SPECIAL 'LABYRINTH' OVERRIDE - RANDOM CHOICE
			if(override.charAt(0) == "~"){
				dest = labFlip(override);
			}
			else{
				dest = override;
				override = "";
			}
		}
			else //NO OVERRIDE
			{
				//GET PATHCOUNT
				thePathCount = parseInt(sessionStorage.getItem('pathCount'))
				//DIRECTIONAL SPLIT
				if(dir == 'fwd') //FORWARD!
				{
					//END OF PATH?
					if(thePathCount == thePathArray.length-1){
						//DOES THE PATH LOOP?
						dest = thePathArray[thePathCount]
						if(dest.charAt(0) == "*")
						{
							//LOOP POSITION SET BY CHARACTERS FOLLOWING "*"
							loopString = parseInt(dest.substring(1,dest.length))
							window.alert(loopString);
							loopNum = parseInt(loopString);
							dest = thePathArray[loopNum]
							loopNum ++; //PREVENT LOOP ENTRY NODE FROM REPEATING
							loopString = parseInt(loopNum) //PERHAPS UNNECESSARY
							sessionStorage.setItem('pathCount', loopString);
						}
					else
						{
							//AT END OF PATH BUT NO LOOP
							dest = "index"
						}
					}
				else //FWD, NOT AT END OF PATH
				{							
							thePathCount ++;
							dest = thePathArray[thePathCount];
							sessionStorage.setItem('pathCount', thePathCount.toString());				
						}
				} //END OF 'FORWARD' CONDITIONS
				else
				{ //REVERSE
					if(thePathCount == 0) //AT START OF PATH; GO TO INDEX
					{
						dest = 'index'
					}
					else
					{ //BACK UP ONE PAGE
						thePathCount --;
						dest = thePathArray[thePathCount];
						sessionStorage.setItem('pathCount', thePathCount.toString());	
					}
				}  // END OF 'REVERSE' CONDITIONS
		} 
			
		//PROCEED TO DESTINATION
		transit(dest);
	} //END OF NO-OVERRIDE CONDITIONS (MAIN LOGIC)

} //END OF PATHFINDER FUNCTION

//CALLED ON THE TWO 'IMAGE' PAGES
function emilyPic(){
	document.getElementById("Emily").src = "images/Emilys/emily_" + Math.floor(Math.random()*100) + ".jpg";
}

//SCRUB FILE EXTENSION FROM PAGE NAMES
function shortNamer()
{
	//GET NAME OF THIS PAGE
	pn = location.href.split("/").slice(-1);
	pn = pn.toString();
	//REMOVE 4-LETTER FILE EXTENSION
	pn = pn.substring(0,pn.length-5)
	return pn
}