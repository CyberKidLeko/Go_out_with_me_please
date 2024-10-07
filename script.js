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