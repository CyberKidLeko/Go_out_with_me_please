// Function to show the next step based on user choice
function nextStep(stepId) {
    hideAllSteps();
    document.getElementById(stepId).classList.add('active');
}

// Hide all steps
function hideAllSteps() {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.remove('active'));
}

// Show initial step
document.getElementById('start').classList.add('active');

// Handle choosing the date
function chooseDate(location) {
    document.getElementById('selectedDate').innerText = location;
    nextStep('chooseDate');
}

// Show a submit message
function submitChoice() {
    const finalResponse = document.getElementById('selectedDate').innerText;
    localStorage.setItem('finalResponse', finalResponse);  // Store in local storage

    // Set the final response to the hidden input field
    document.getElementById('finalResponse').innerText = finalResponse;
    document.getElementById('finalChoice').value = finalResponse; // Assign value to hidden input

    // Google Form action URL (replace with your own action URL)
    const formActionURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc8UMqXrLPagQLVVz5DjbQPMhN2vYBPNDMpSenFzEu_DMohtw/formResponse';

    // Create a FormData object
    const formData = new FormData();
    formData.append('entry.YOUR_ENTRY_ID', finalResponse); // Replace YOUR_ENTRY_ID with the correct entry ID from your Google Form

    // Send data to Google Form using fetch
    fetch(formActionURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Enable no-cors mode to avoid CORS issues
    })
    .then(response => {
        // Handle success if needed
        console.log('Response submitted successfully:', response);
    })
    .catch(error => {
        console.error('Error submitting response:', error);
    });

    nextStep('submitMessage');
}


// Show the submit message for option
function showSubmitMessage() {
    nextStep('submitMessage');
}

function showSadMessage() {
    hideAllSteps(); // Hide other steps
    document.getElementById('sadMessage').style.display = 'block'; // Show sad message page
}

function chooseDate(location) {
    document.getElementById('selectedDate').innerText = location;
    nextStep('dateAndTime');  // Go to date and time selection step
}

//Function to confirm date and time selection and display the final step
function confirmDateAndTime() {
    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;

    // Validate that both date and time are selected
    if (selectedDate && selectedTime) {
        const dateTimeMessage = `Location: ${document.getElementById('selectedDate').innerText}, Date: ${selectedDate}, Time: ${selectedTime}`;
        document.getElementById('selectedDate').innerText = dateTimeMessage;
        nextStep('chooseDate');  // Move to the final confirmation step
    } else {
        alert("Please select both date and time!");
    }
}


function createHeartAnimation(event) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖'; // Heart emoji
    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;
    document.body.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => heart.remove(), 1500);
}

document.body.addEventListener('click', createHeartAnimation);


function sendResponseToGoogleForm(response) {
    const formID = '1n8Jd44Hj-YyCy4BTt6zVEYXdsvncyroQlBKo7lK4x00'; // Your Form ID
    
    const entryId = '1ES2QeiKfuAGaMQDiEl3OMruUvbR8o6dxvG1AgBIMNhE';

    const url = `https://docs.google.com/forms/d/e/${formID}/formResponse`;

    const formData = new FormData();
    formData.append(entryId, response); // Add the response to the form data

    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    }).then(() => {
        console.log('Response sent to Google Form');
    }).catch(error => {
        console.error('Error sending response:', error);
    });
}