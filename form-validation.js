(function() {
    
    // disable validation in HTML5
    document.forms.contactForm.noValidate = true;
    
    // declaration of variables
    const contactForm = document.getElementById('contactForm');
    const messageContent = document.getElementById('messageContent');
    const counterDisplay = document.getElementById('counter');
    const consentFeedback = document.getElementById('consentFeedback');
    const successFeedback = document.getElementById('successFeedback');
    let valid = {};
    let firstSubmit, formValid, emailCharacters, counter;
    // END declaration of variables
    
    // form checking function
    function checkForm(e, state) {
        var target = e.target;

        if (state) {
            for (var i=0; i<contactForm.length-1; i++) {
                checkElements(contactForm[i]);
            }
            
            for (var field in valid)  {
                if (!valid[field]) {
                    formValid = false;
                    break;
                }
                formValid = true;
            }
            
            if (formValid) {
                successFeedback.style.color ="#198754";
                successFeedback.style.display = 'block';
                e.preventDefault();
            } else {
                successFeedback.style.display = 'none';
                e.preventDefault();
            }
            firstSubmit = true;
        }
        
        if (!state && firstSubmit) {
            checkElements(target);
        }
        
        function checkElements(target) {
            if (target.type == 'text' && target.required && !target.value) {
                target.className=('form-control is-invalid');
                valid[target.id] = false;
            } else if (target.type == 'text' && target.required && target.value) {
                target.className=('form-control is-valid');
                valid[target.id] = true;
            }
            
            if (target.type == 'email') {
                emailCharacters = /[^@]+@[^@]+/.test(target.value);
                
                if (!emailCharacters) {
                    target.className='form-control is-invalid';
                    valid[target.id] = false;
                } else {
                    target.className='form-control is-valid';
                    valid[target.id] = true;
                }
            }
            
            if (target.type == 'checkbox' && !target.checked && target.required) {
                target.focus();
                target.className='form-check-input consent-is-invalid';
                consentFeedback.style.display = 'block';
                valid[target.id] = false;
            } else if (target.type == 'checkbox' && target.checked && target.required) {
                target.className='form-check-input';
                consentFeedback.style.display = 'none';
                valid[target.id] = true;
            }
        }
    }
    // END form checking function

    // function updating the number of characters in the message content
    function updateCounter(e) {
        var target = e.target;
        
        counter = (150 - (target.value.length));
        counterDisplay.textContent = counter;
    }
    // END function
    
    // event observers
    document.addEventListener('load', contactForm.reset(), false);

    contactForm.addEventListener('submit', function(e) {
        checkForm(e, true);
    }, false);

    contactForm.addEventListener('input', function(e) {
        checkForm(e, false);
    }, false);

    messageContent.addEventListener('input', updateCounter, false);
    // END event observers

}());