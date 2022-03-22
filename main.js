// Sets the image from the selected file
function set_image() {
    var data = document.querySelector('input[type="file"]').files[0];
    var image_element = document.getElementById("image");
    image_element.src = URL.createObjectURL(data);
}

// Cleans the results table
function clean_table() {
    var table = document.getElementById("prediction-table");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

// Appends the prediction to the table
function append_prediction(prediction) {
    clean_table();

    var disease = document.getElementById("disease");
    var probability = document.getElementById("probability");
    disease.innerHTML = prediction.predictions[0].tagName;
    probability.innerHTML = (prediction.predictions[0].probability * 100).toString().substring(0, 5) + "%";

    for (var i = 0; i < prediction.predictions.length; i++) {
        var table = document.getElementById("prediction-table");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        // set id for cell2 
        cell2.id = "right";

        cell1.innerHTML = prediction.predictions[i].tagName;
        cell2.innerHTML = (prediction.predictions[i].probability * 100).toString().substring(0, 5) + "%";
    }
}

// Sends the image to the server and returns the prediction
function predict() {
    var DATA = document.querySelector('input[type="file"]').files[0];
    const URL = 'https://westus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/cbceb6b4-6f4d-4717-8572-974776e9f407/classify/iterations/Iteration2/image';
    const HEADERS = {
        "Prediction-Key": "0c35d4a0a6894b9fa4fc0f4bfb931b3d",
        "Content-Type": "application/octet-stream"
    };

    fetch(URL, {
        method: 'POST',
        headers: HEADERS,
        body: DATA
    }).then(response => response.json()).then(data => {
        append_prediction(data);
    }).catch(err => console.log(err));
}