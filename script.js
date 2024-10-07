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
    nextStep('dateAndTime'); // Go to date and time selection step
}

// Function to confirm date and time selection and display the final step
function confirmDateAndTime() {
    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;

    // Validate that both date and time are selected
    if (selectedDate && selectedTime) {
        const location = document.getElementById('selectedDate').innerText;
        const dateTimeMessage = `Location: ${location}, Date: ${selectedDate}, Time: ${selectedTime}`;
        document.getElementById('selectedDate').innerText = dateTimeMessage;
        nextStep('chooseDate'); // Move to the final confirmation step
    } else {
        alert("Please select both date and time!");
    }
}

// Show a submit message after final choice is made
function submitChoice() {
    const location = document.getElementById('selectedDate').innerText.split(',')[0].replace('Location: ', '').trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Store in local storage (optional)
    localStorage.setItem('finalResponse', location);

    // Set the final response to the hidden input field
    document.getElementById('finalResponse').innerText = location;
    document.getElementById('finalChoice').value = location;

    // Send data to the backend server
    fetch('http://localhost:7000/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: location, date: date, time: time })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Response submitted successfully');
            nextStep('submitMessage');
        } else {
            console.error('Error submitting response:', data.message);
        }
    })
    .catch(error => {
        console.error('Error submitting response:', error);
    });
}

// Function to show the sad message if user says "No"
function showSadMessage() {
    hideAllSteps(); // Hide other steps
    document.getElementById('sadMessage').style.display = 'block'; // Show sad message page
}

// Heart animation function to add interactive effects
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

// Add event listener to the body for heart animation effect
document.body.addEventListener('click', createHeartAnimation);
