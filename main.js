lx = 0;
ly = 0;
rx = 0;
ry = 0;
lws = 0;
rws = 0;
function preload()
{
    song = loadSound('music.mp3');
}
function setup()
{
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450,375);
    video.hide();
    pn = ml5.poseNet(video, modelLoaded);
}
function draw()
{
    image(video, 0, 0, 500, 500);
    pn.on("pose", gotPoses);
    fill("#FF0000");
    stroke("#000000");
    if(lws > 0.2)
    {
    circle(lx, ly, 20);
    a = floor(Number(ly));
    b = a/500;
    c = 1-b;
    console.log(c);
    document.getElementById("volume").innerHTML = c;
    song.setVolume(c);
    }
    if(rws > 0.2)
    {
        circle(rx, ry, 20);
        if(ry>=0 && ry<= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
        if(ry>100 && ry<= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        if(ry>200 && ry<= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        if(ry>300 && ry<= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        if(ry>400 && ry<= 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(.5);
        }
    }
}
function playsong()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded()
{
    console.log("Model has been loaded");
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        lx = results[0].pose.leftWrist.x;
        ly = results[0].pose.leftWrist.y;
        rx = results[0].pose.rightWrist.x;
        ry = results[0].pose.rightWrist.y;
        console.log("Left Wrist: x = "+lx+", y = "+ly);
        console.log("Right Wrist: x = "+rx+", y = "+ry);
        lws = results[0].pose.keypoints[9].score;
        rws = results[0].pose.keypoints[10].score;
    }
}
