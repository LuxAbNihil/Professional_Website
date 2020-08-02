window.addEventListener("load", function() {

    //set backgorund colors for events of text and textarea inputs
    let focusBackgroundColor = "palegoldenrod";
    let blurBackgroundColor = "white";
    let invalidInputIndicatorColor = "palevioletred";
    let submitButtonPressedBackgroundColor = "grey";

    //assign elements that need event listeners to javascript variables
    let inputList = document.getElementsByTagName("input");
    let textarea = document.getElementById("message");
    let submitButton = document.getElementById("submit-button");
    let honorific = document.getElementById("honorific");
    let name = document.getElementById("name");
    let company = document.getElementById("company");
    let email = document.getElementById("email");
    let telephone = document.getElementById("telephone_number");
    let message = document.getElementById("message")

    //Regular Expressions for validating input in form
    let honorificRegExp = new RegExp('^[a-z]{0,10}[\.]?$', 'i');
    let nameRegExp = new RegExp("^[a-z]?([a-z]| |'){0,127}$", "i");
    let companyRegExp = new RegExp("^([a-z]|[0-9])?([a-z]|[0-9]| |\'|\-|\_){0,127}$", "i");
    let emailPrefixRegExp = new RegExp("^(([a-z]|[0-9])+(|\-|\_|\.))+([a-z]|[0-9])", "i");
    let emailDomainRegExp = new RegExp("^(([a-z]|[0-9])+((\-)?([a-z]|[0-9])+)+)+$", "i");
    let telephoneRegExp = new RegExp(/^([0-9]{0,3}(\-| ){0,1})?((\([0-9]{3}\)|[0-9]{3}))((\-| )?[0-9]{3})((\-| )?[0-9]{4})$/);

    //sets all valid input flags to true for page initialization 


    //grab default backgorund color submit input
    let submitButtonOriginalBackgroundColor = submitButton.style.backgroundColor;

    //loop through and add event listeners to text inputs
    for(let i = 0; i < inputList.length - 1; i ++) {
        inputList[i].addEventListener("focus", function() {
            changeBackgroundColor(inputList[i], focusBackgroundColor)
            checkValidFlag(inputList[i])
        });
        inputList[i].addEventListener("blur", function() {changeBackgroundColor(inputList[i], blurBackgroundColor)});
    }

    //add event listeners to textarea input
    textarea.addEventListener("focus", function() {changeBackgroundColor(textarea, focusBackgroundColor)});
    textarea.addEventListener("blur", function() {changeBackgroundColor(textarea, blurBackgroundColor)});

    //add event listeners to submit input
    submitButton.addEventListener("focus", function() {changeBackgroundColor(submitButton, submitButtonPressedBackgroundColor)})
    submitButton.addEventListener("blur", function() {changeBackgroundColor(submitButton, submitButtonOriginalBackgroundColor)});


    //add event listener for creating feedback on valid input
    honorific.addEventListener("blur", function() {
        let isHonorificValid = honorificRegExp.test(honorific.value);
        isInputValid(honorific, isHonorificValid);
        if(!isHonorificValid) {
            /*gets parent node, then creates a new paragraph node and new text node, then appends text node to the paragraph node and finally 
            appends the new paragraph node to the parent element (div class = "form-element") */
            let parent = honorific.parentNode;
            let newParagraph = document.createElement("p");
            let errorText = document.createTextNode("Honorifics can have up to 10 letters in the English alphabet and optionally end with a period");
            newParagraph.id = "honorific-error-text";
            newParagraph.appendChild(errorText);
            parent.appendChild(newParagraph);
        }
    });

    honorific.addEventListener("focus", function () {
        let errorNode = document.getElementById("honorific-error-text")
        if( errorNode !== null) {
            errorNode.remove();
        }
    })

     //add event listener for creating feedback on valid input
    name.addEventListener("blur", function() {
        let isNameValid = nameRegExp.test(name.value);
        isInputValid(name, isNameValid);
        if(!isNameValid) {
            let parent = name.parentNode;
            let newParagraph = document.createElement("p");
            let errorText = document.createTextNode("Names consist of the letters a through z in upper or lower case and can include apostrophes and spaces and can be up to 127 characters long");
            newParagraph.id = "name-error-text";
            newParagraph.appendChild(errorText);
            parent.appendChild(newParagraph);
        }
    });

    name.addEventListener("focus", function() {
        let errorNode = document.getElementById("name-error-text");
        if(errorNode !== null) {
            errorNode.remove();
        }
    })



     //add event listener for creating feedback on valid input
    company.addEventListener("blur", function() {
        let isCompanyValid = companyRegExp.test(company.value);
        isInputValid(company, isCompanyValid);
        if(!isCompanyValid) {
            let parent = company.parentNode;
            let newParagraph = document.createElement("p");
            let errorText = document.createTextNode("Company names can include upper or lower case letters, numerals, apostrophes, dashes, and underscores.  Must start with either a letter or a number.");
            newParagraph.id = "company-error-text";
            newParagraph.appendChild(errorText);
            parent.appendChild(newParagraph);
        }
    });

    company.addEventListener("focus", function() {
        let errorNode = document.getElementById("company-error-text");
        if(errorNode !== null) {
            errorNode.remove();
        }
    })

     //add event listener for creating feedback on valid input
    email.addEventListener("blur", function (){
        let isEmailValid = true;
        let call = function () {
            isEmailValid = false;
            isInputValid(email, isEmailValid);
            let parent = email.parentNode;
            let newParagraph = document.createElement("p");
            let errorText = document.createTextNode("Emails must be in the format xxxxx@xxx.xxx");
            newParagraph.id = "email-error-text";
            newParagraph.appendChild(errorText);
            parent.appendChild(newParagraph);
        }

        let validCall = function() {
            isInputValid(email, isEmailValid);
        }

        if(email.value === "") {
            validCall();
            return;
        }

        let emailPrefixAndDomain = email.value.split(/@/);
        if(emailPrefixAndDomain.length != 2){
            call();
            return;
        }

        if(!emailPrefixRegExp.test(emailPrefixAndDomain[0])) {
            call();
            return;
        }

        if(emailPrefixAndDomain[1].length < 3 | emailPrefixAndDomain[1].length > 255) {
            call();
            return;
        }

        let emailDomains = emailPrefixAndDomain[1].split(/\./);
        let maxIterations = emailDomains.length;
        
        if(emailDomains.length < 2) {
            call();
            return;
        }

        for(index = 0; index < maxIterations; index++) {
            if(!emailDomainRegExp.test(emailDomains[index])) {
                call()
                break;
            }
        }

        isInputValid(email, isEmailValid);
    });

    email.addEventListener("focus", function () {
        let errorNode = document.getElementById("email-error-text");
        if(errorNode !== null) {
            errorNode.remove();
        }
    })

    telephone.addEventListener("blur", function() {
        let isPhoneValid = telephoneRegExp.test(telephone.value);
        if(!isPhoneValid && telephone.value !== "") {
            let errorText = "Telephone numbers must be in the format ccc-(xxx)-xxx-xxxx where ccc is an optional country code.  " +
                "The parantheses are also optional and number blocks can " +
                "be seperated by spaces, dashes, or nothing";
            isInputValid(telephone, isPhoneValid);
            setErrorText(telephone, errorText);
        } else if(isPhoneValid) {
            removeErrorTextIfValid(telephone, isPhoneValid);
        }
    });

    telephone.addEventListener("focus", function () {
        let isPhoneValid = telephoneRegExp.test(telephone.value);
        removeErrorTextIfValid(telephone, isPhoneValid);
    })
    
    submitButton.addEventListener("onClick", function(event) {
        event.preventDefault();
    });

    //changes background color to specified color for the specified element
    let changeBackgroundColor = function (element, color) {
      element.style = "background-color: " + color;
     }

    let isInputValid = function (element, input) {
        if(!input) {
            changeBackgroundColor(element, invalidInputIndicatorColor);
        } else {
            changeBackgroundColor(element, blurBackgroundColor);
        }
     }

     //creates a new paragraph with given error text and appends it to the form element div.
     let setErrorText = function(node, errorText) {
         let parent = node.parentNode;
         let newParagraph = document.createElement("p");
         let errorTextNode = document.createTextNode(errorText);
         newParagraph.id = node.id + "-error-text"; //automatically generates id for new p node based on given id of HTML form element.
         newParagraph.appendChild(errorTextNode);
         parent.appendChild(newParagraph);
     }

     /*removes error text p from form element div if the input is determined to be valid. node is the element that the
        error message is attached to and boolean is true if input is valid and false if invalid */
     let removeErrorTextIfValid = function(node, boolean) {
         let errorNode = document.getElementById(node.id + "-error-text"); //automatically selects error text p element of given node
         if(errorNode != null && boolean === true) {
             errorNode.remove();
         }
     } 
});