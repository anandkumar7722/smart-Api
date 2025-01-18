document.getElementById('uploadForm').addEventListener("submit", async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById("inputImage");
    const file = fileInput.files[0];

    if (!file){
        alert("Please, select an image!");
        return;
    }
    
    const formData = new FormData();
    formData.append("file", file)

    try{
            const response = await fetch('https://garbage-classifier-fastapi.onrender.com/predict', {  /* Change the URL to 127.0.0.1/8000 for local dev server */
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if(response.ok){
            document.getElementById('prediction').textContent = `Predicted: ${data.predicted_label}, Confidence: ${(data.confidence_score).toFixed(3)}`; 
            document.getElementById('uploadedImage').src = URL.createObjectURL(file); /* temp url for loading image in browser */
            document.getElementById('uploadedImage').style.display = "block";
        }
        else{
            document.getElementById('prediction').textContent = `Error: ${data.error}`;
        }
    }
    catch (error) {
        document.getElementById('prediction').textContent = `Catch Error: ${error.message}`;
    }
});
