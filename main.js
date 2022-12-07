//https://teachablemachine.withgoogle.com/models/zRZrP69Xc/model.json
Webcam .set({
    width:390,
    height:300,
    image_format:"jpg",
    jpg_quality:90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zRZrP69Xc/model.json', modelLoaded);
function modelLoaded() {
    console.log('Model Loaded!');
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3)*100+" %";
        var synth = window.speechSynthesis;
        speak_data = "it is your "+results[0].label;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    }
}