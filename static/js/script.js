navigator.getMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

navigator.getMedia(
  // constraints
  {
    video: true,
    // audio: true
  },

  // successCallback
  function(localMediaStream) {
    $('#snap').show();
    var video = document.getElementById('video');

    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
    // video.onloadedmetadata = function(e) {
    //    // Do something with the video here.
    // };
  },

  // errorCallback
  function(err) {
    console.log('The following error occured: ' + err);
    $('#countdown').text('Please Reload and ENABLE your camera');
  },
);

function updateCountdown() {
  var seconds = 4;
  setTimeout(countdown, 900);

  function countdown() {
    $('h1').hide();
    seconds--;
    if (seconds > 0) {
      $('#countdown').text(seconds + ' seconds... Cheese!');
      setTimeout(countdown, 900);
    } else {
      $('#countdown').text(seconds + ' seconds... Cheese!');
      $('#countdown').hide();
      video.pause();

      var canvas = document.getElementById('canvas');
      $('#countdown').text('');
      $('#download').show();
      context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, 640, 480);

      $('#snap').prop('disabled', false);

      $('#download').click(function() {
        var cs = new saver('lib/download.php?id=' + video.value);
        cs.savePNG(canvas);
      });
    }
  }
}

function snap() {
  video.play();
  $('#snap').attr('disabled', true);
  updateCountdown();
  document.querySelector('video').removeEventListener('click', changeFilter, false);
}

function saver(url) {
  this.url = url;

  this.savePNG = function(canvas) {
    if (!canvas || !url) {
      return;
    }

    var data = canvas.toDataURL('image/png');
    data = data.substr(data.indexOf(',') + 1).toString(); //remove base64

    var dataInput = document.createElement('input');
    dataInput.setAttribute('name', 'imgdata');
    dataInput.setAttribute('value', data);
    dataInput.setAttribute('type', 'hidden');

    var form = document.createElement('form');
    form.method = 'post';
    form.action = url;
    form.appendChild(dataInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };
}
