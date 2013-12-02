navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

navigator.getMedia(

    // constraints
    {
        video: true,
        // audio: true
    },

    // successCallback
    function (localMediaStream) {
        $('#snap').show();
        var video = document.getElementById("video");

        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
        // video.onloadedmetadata = function(e) {
        //    // Do something with the video here.
        // };
    },

    // errorCallback
    function (err) {
        console.log("The following error occured: " + err);
        $("#countdown").text("Please Reload and ENABLE your camera");
    }

);

function updateCountdown() {
    var seconds = 4;
    setTimeout(countdown, 900);

    function countdown() {
        seconds--;
        if (seconds > 0) {
            $("#countdown").text(seconds + " seconds... Cheese!");
            setTimeout(countdown, 900);
        } else {
            $("#countdown").text(seconds + " seconds... Cheese!");

            video.pause(); 

            var canvas = document.getElementById("canvas");
            $("#countdown").text("");
            $('#download').show();
            $('#bright').show();
            context = canvas.getContext("2d");          
            context.drawImage(video, 0, 0, 640, 480);


            $('#snap').prop("disabled", false);

            $("#download").click(function () {
                var cs = new saver('lib/gray.php');
                cs.savePNG(canvas, 'image');
            });
            $("#bright").click(function () {
                var cs = new saver('lib/brightness.php');
                cs.savePNG(canvas, 'image');
            });

        }
    }
};

function snap() {
    video.play();
    $('#snap').attr("disabled", true);
    updateCountdown();
}

function saver(url) {
    this.url = url;

    this.savePNG = function (canvas, fname) {
        if (!canvas || !url) return;
        fname = fname || 'picture';

        var data = canvas.toDataURL("image/png");
        data = data.substr(data.indexOf(',') + 1).toString();

        var dataInput = document.createElement("input");
        dataInput.setAttribute("name", 'imgdata');
        dataInput.setAttribute("value", data);
        dataInput.setAttribute("type", "hidden");

        var nameInput = document.createElement("input");
        nameInput.setAttribute("name", 'name');
        nameInput.setAttribute("value", fname + '.png');

        var myForm = document.createElement("form");
        myForm.method = 'post';
        myForm.action = url;
        myForm.appendChild(dataInput);
        myForm.appendChild(nameInput);

        document.body.appendChild(myForm);
        myForm.submit();
        document.body.removeChild(myForm);
    };
    
}