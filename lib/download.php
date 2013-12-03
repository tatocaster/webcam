<?php

// PNG image
// header('Content-type: image/png');
// header('Content-Disposition: attachment; filename="' . $_POST['name'] . '"');

// capture, replace any spaces w/ plusses, and decode
$encoded = $_POST['imgdata'];
$id = $_GET['id'];


// $encoded = str_replace(' ', '+', $encoded);
$decoded = base64_decode($encoded);
// write decoded data
// echo $decoded;

	unlink("image_mod.png");
	unlink("image.png");

$gray = IMG_FILTER_GRAYSCALE;
$brightness = IMG_FILTER_BRIGHTNESS;
$size = 100;

switch ($id){
	case "grayscale":
		image_filter($decoded,$gray);
	break;

	case "brightness":
		image_filter($decoded,$brightness,$size);
	break;
	default : 
	echo "Some Error Occured, Try Again";
}


function image_filter($decoded,$gray, $size=0){
	file_put_contents('image.png', $decoded);
	$img = imagecreatefrompng('image.png');
	imagefilter($img,$gray,$size);
	imagepng($img,'image_mod.png');
	imagedestroy($img);
	echo "<img src='image_mod.png' />";
	echo "<button><a href='image_mod.png' style='text-decoration:none;' download='Image'>Download Image</a></button>";
	echo "<button><a href='../' style='text-decoration:none;'>New Image</a></button>";
}