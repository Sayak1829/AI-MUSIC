song1 = "";
song2 = "";
song1status = "";
song2status = "";

scorerightWrist = 0;
scoreleftWrist = 0;

leftWrist_x = 0;
leftWrist_y = 0;

rightWrist_x = 0;
rightWrist_y = 0;

function preload() {
    song1 = loadSound("Rise up.mp3");
    song2 = loadSound("Legends never die.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotresults);
}
function draw() {
    image(video, 0, 0, 600, 500);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    fill(255, 0, 0);
    stroke(254, 1, 0);
    if (scoreleftWrist > 0.2) {
        circle(leftWrist_x, leftWrist_y, 20);
        song2.stop();
        if (song1status == false) {
            song1.play();
            document.getElementById("speed").innerHTML = "Playing Rise Up";
        }
    }
    if (scorerightWrist > 0.2) {
        circle(ringtWrist_x, rightWrist_y, 20);
        song1.stop();
        if (song2status == false) {
            song2.play();
            document.getElementById("speed").innerHTML = "Playing Legends never die";
        }
    }
}


function modelloaded() {
    console.log("POSENET has been initialized");
}
function gotresults(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("score = " + scoreleftWrist);
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("score = " + scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist x = " + leftWrist_x + "leftWrist y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist x = " + rightWrist_x + "rightWrist y = " + rightWrist_y);
    }
}