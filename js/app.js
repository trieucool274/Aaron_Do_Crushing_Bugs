
(() => {
    const puzzleSelectors = document.querySelectorAll("#buttonHolder img"),
			dropContainer = document.querySelector(".puzzle-board"),
			dragImages = document.querySelectorAll(".puzzle-image"),
			dropZones = document.querySelectorAll(".drop-zone"),
            puzzlepieces = document.querySelector(".puzzle-pieces");

    
    function swapImages() {
   
        dropContainer.style.backgroundImage = `url(images/dd/backGround${this.dataset.imageref}.jpg)`;

        puzzlepieces.appendChild(document.querySelector('#topLeft'));
        puzzlepieces.appendChild(document.querySelector('#topRight'));
        puzzlepieces.appendChild(document.querySelector('#bottomLeft'));
        puzzlepieces.appendChild(document.querySelector('#bottomRight'));

        document.querySelector("#topLeft").src = `images/dd/topLeft${this.dataset.imageref}.jpg`;
        document.querySelector("#topRight").src = `images/dd/topRight${this.dataset.imageref}.jpg`;
        document.querySelector("#bottomLeft").src = `images/dd/bottomLeft${this.dataset.imageref}.jpg`;
        document.querySelector("#bottomRight").src = `images/dd/bottomRight${this.dataset.imageref}.jpg`;
    }

    function startDrag(event) {

        event.dataTransfer.setData("dragTarget", this.id); 
        // debugger;        
    }

    function draggedOver(event) {
        event.preventDefault();
        console.log('dragging over drop zone elements');
    }

    function dropped(event) {
        event.preventDefault();

        if (this.children.length > 0) { return; }

        
        let targetID = event.dataTransfer.getData("dragTarget");
   
        if (this.dataset.ref !== targetID) { alert("IT'S THE WRONG SLOT!PLEASE TRY AGAIN!"); return; }


        let targetImage = document.querySelector('#' + targetID);

        this.appendChild(targetImage);
    }
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