window.addEventListener("load", (function() {

    let inputList = document.getElementsByTagName("input");
    let textarea = document.getElementById("last-element");

    for(let i = 0; i < inputList.length; i ++) {
        inputList[i].addEventListener("blur", changeBackgroundColor(inputList[i]));
    }

    textarea.addEventListener("blur", changeBackgroundColor(textarea));

    function changeBackgroundColor(node) {
        node.style.backgroundcolor = palegoldenrod;
    }

})());