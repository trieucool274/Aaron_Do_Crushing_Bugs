// wrap everything in an IIFE / module
// a module is a JavaScript "pattern" - a programming convention
// this keeps your code private - kinda like a "black box" - which is a best practice

(() => {
    //identify the nodes of interest in the DOM
    const puzzleSelectors = document.querySelectorAll("#buttonHolder img"),
			dropContainer = document.querySelector(".puzzle-board"),
			dragImages = document.querySelectorAll(".puzzle-image"),
			dropZones = document.querySelectorAll(".drop-zone"),
            puzzlepieces = document.querySelector(".puzzle-pieces");

    
    function swapImages() {
        // swap out the draggable thumbnail images
        // update the backgound image of the drop zone dropContainer
        dropContainer.style.backgroundImage = `url(images/dd/backGround${this.dataset.imageref}.jpg)`;

         // 1. get the imageref attribute from the element we're clicking on
        puzzlepieces.appendChild(document.querySelector('#topLeft'));
        puzzlepieces.appendChild(document.querySelector('#topRight'));
        puzzlepieces.appendChild(document.querySelector('#bottomLeft'));
        puzzlepieces.appendChild(document.querySelector('#bottomRight'));

        // 2. set the backround image of the dropContainer
        document.querySelector("#topLeft").src = `images/dd/topLeft${this.dataset.imageref}.jpg`;
        document.querySelector("#topRight").src = `images/dd/topRight${this.dataset.imageref}.jpg`;
        document.querySelector("#bottomLeft").src = `images/dd/bottomLeft${this.dataset.imageref}.jpg`;
        document.querySelector("#bottomRight").src = `images/dd/bottomRight${this.dataset.imageref}.jpg`;
    }

    function startDrag(event) {
        //save a reference to the element the user is dragging
        //so that we can retrieve the element later and put it in a drop zone
        event.dataTransfer.setData("dragTarget", this.id); 
        //MDN drag and drop referenced
        // debugger;        
    }

    function draggedOver(event) {
        event.preventDefault();
        console.log('dragging over drop zone elements');
    }

    function dropped(event) {
        //allow a drop to happen
        event.preventDefault();

        //if we have already dropped and appended into a drop zone, then it sholdnt happen again
        // the return statemnet is a code killer - nothing will execute past this line /staement
        if (this.children.length > 0) { return; }

        
        let targetID = event.dataTransfer.getData("dragTarget");
        // if the id of the target image does not match the data set of the drop zone, i.e 'topLeft',
				// it does not allow to drop there;
        if (this.dataset.ref !== targetID) { alert("IT'S THE WRONG SLOT!PLEASE TRY AGAIN!"); return; }


        //get the reference to the dragged image-saved in the drag function using setData
        let targetImage = document.querySelector('#' + targetID);

        // add it to the zone we dropped the image on
        this.appendChild(targetImage);
    }
    // event handling at the bottom
    dragImages.forEach(piece => {
        piece.addEventListener('dragstart', startDrag);
    });


    dropZones.forEach(zone => {
        zone.addEventListener('drop', dropped);
        zone.addEventListener('dragover', draggedOver);
    });

    puzzleSelectors.forEach(button => button.addEventListener("click", swapImages));
    	// puzzleSelectors.forEach(button => button.addEventListener("click", resetPuzzlePieces));
})();