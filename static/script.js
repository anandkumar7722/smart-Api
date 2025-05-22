document.addEventListener('DOMContentLoaded', () => {
    const inputImage = document.getElementById('inputImage');
    const fileNameSpan = document.getElementById('file-name');
    const predictButton = document.getElementById('predictButton');
    const uploadedImage = document.getElementById('uploadedImage');
    const predictionText = document.getElementById('prediction');
    const resultSection = document.getElementById('result-section');
    const loadingIndicator = document.getElementById('loading-indicator');
    const uploadForm = document.getElementById('uploadForm'); // We'll still use a form conceptually

    // Function to update the file name display and enable/disable button
    inputImage.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            fileNameSpan.textContent = this.files[0].name;
            predictButton.disabled = false; // Enable the button once a file is selected

            // Display image preview
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage.src = e.target.result;
                uploadedImage.style.display = 'block'; // Make sure image is visible
                document.getElementById('img-preview-container').style.display = 'flex'; // Show container
            };
            reader.readAsDataURL(this.files[0]);
        } else {
            fileNameSpan.textContent = 'No file chosen';
            predictButton.disabled = true; // Disable if no file
            uploadedImage.style.display = 'none'; // Hide image
            document.getElementById('img-preview-container').style.display = 'none'; // Hide container
            resultSection.style.display = 'none'; // Hide results if no file
        }
    });

    // Handle the prediction process (simulated for now)
    predictButton.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent default form submission if it were a form

        if (!inputImage.files || !inputImage.files[0]) {
            alert('Please select an image first!');
            return;
        }

        // Show loading indicator and hide previous results
        resultSection.style.display = 'block'; // Make sure result section is visible
        loadingIndicator.style.display = 'flex';
        predictionText.textContent = ''; // Clear previous prediction
        uploadedImage.style.display = 'block'; // Ensure image is still shown

        const formData = new FormData();
        formData.append('file', inputImage.files[0]);

        try {
            // Simulate API call delay
            // In a real application, you would replace this with a fetch request to your backend:
            // const response = await fetch('/predict', {
            //     method: 'POST',
            //     body: formData
            // });
            // const data = await response.json();

            // Simulate a response for demonstration
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2-second delay
            const simulatedData = { class: 'Recyclable Plastic', confidence: 0.92 };

            // Update UI with prediction
            predictionText.textContent = simulatedData.class;
            document.getElementById('confidence').textContent = `Confidence: ${(simulatedData.confidence * 100).toFixed(2)}%`;

        } catch (error) {
            console.error('Error during prediction:', error);
            predictionText.textContent = 'Error: Could not classify image.';
            document.getElementById('confidence').textContent = '';
        } finally {
            loadingIndicator.style.display = 'none'; // Hide loading indicator
        }
    });

    // Initialize button state
    if (!inputImage.files || inputImage.files.length === 0) {
        predictButton.disabled = true;
    }
});