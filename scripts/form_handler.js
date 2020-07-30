window.addEventListener("load", function() {

    let inputList = document.getElementsByTagName("input");
    let textarea = document.getElementById("message");

    for(let i = 0; i < inputList.length - 1; i ++) {
        inputList[i].addEventListener("focus", function() {changeBackgroundColorToYellow(inputList[i])});
        inputList[i].addEventListener("blur", function() {changeBackgroundColorToWhite(inputList[i])});
    }

    textarea.addEventListener("focus", function() {changeBackgroundColorToYellow(textarea)});
    textarea.addEventListener("blur", function() {changeBackgroundColorToWhite(textarea)});

    function changeBackgroundColorToYellow(node) {
        node.style = "background-color: palegoldenrod";
    }

    function changeBackgroundColorToWhite(node) {
        node.style = "background-color: white";
    }

});