//SET UP OVERRIDE VARIABLE
override = "";

//SET LISTENER FOR PATH & STREAM KEYS
window.addEventListener('keyup', function(event) {
  // NUMBER 13 IS "RETURN"; NUMBER 17 IS "CONTROL"
  if (event.keyCode == 13) pathFinder(); if(event.keyCode == 17) streamLiner()	
}); 

//HANDLE STREAMS
function streamLiner()
{
	dest = "";
	//GET NAME OF THIS PAGE
	thisPage = location.href.split("/").slice(-1);
	thisPage = thisPage.toString();
	//REMOVE 4-LETTER FILE EXTENSION
	thisPage = thisPage.substring(0,thisPage.length-5)
	//SEARCH THROUGH STREAMS TO FIND WHAT STREAM INCLUDES THIS SPACE
	for(var i=0; i<allStreams.length; i++){
		//IF ARRAY INCLUDES PAGE, USE THE ARRAY
		if(allStreams[i].includes(thisPage)) searchArray = allStreams[i];
	}
	//FIND ORDINAL POS. IN SEARCHARRAY
	for(var i=0; i<searchArray.length; i++){
		if(searchArray[i] == thisPage) thePos = i;
	}
	//IF FINAL ITEM, DEST IS 'STREAMLINES' PAGE
	if(thePos == searchArray.length-1){
		dest = "Streamlines"
	}
	else{
		//IF NOT FINAL, DEST IS NEXT PAGE IN ARRAY
		dest = searchArray[thePos + 1]
	}
	//PROCEED TO DESTINATION
	location = dest + ".html";
}

//HANDLE PATHS
function pathFinder()
{
		dest = "";
		//CONVERT STORED PATH STRING TO ARRAY
		pathString = sessionStorage.getItem('currentPath')
		thePathArray = pathString.split(',')	
		//CHECK FOR LOCAL OVERRIDE DEFAULT
		if(override != ""){
			dest = override;
			override = "";
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
	//PROCEED TO DESTINATION
	location = dest + ".html";
}



