var FileDropZone = function(id,filesHandler){
    var dropZone = document.getElementById(id);
    dropZone.addEventListener('dragover',function(evt){
        evt.stopPropagation();
        evt.preventDefault();
    }, false);
    dropZone.addEventListener('drop',function(evt){
        evt.stopPropagation();
        evt.preventDefault();
        filesHandler(evt.dataTransfer.files); // handle FileList object.
    }, false);
}


