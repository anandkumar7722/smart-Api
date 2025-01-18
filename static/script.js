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
            const API_URL = process.env.API_URL || "http://127.0.0.1:8000";
            const response = await fetch(`${API_URL}/predict/`, {
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
