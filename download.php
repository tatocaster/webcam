<?php

// PNG image
// header('Content-type: image/png');
// header('Content-Disposition: attachment; filename="' . $_POST['name'] . '"');

// capture, replace any spaces w/ plusses, and decode
$encoded = $_POST['imgdata'];
// $encoded = str_replace(' ', '+', $encoded);
$decoded = base64_decode($encoded);

// write decoded data
// echo $decoded;

	unlink("image_mod.png");
	unlink("image.png");

	file_put_contents('image.png', $decoded);
	$img = imagecreatefrompng('image.png');
	imagefilter($img,IMG_FILTER_GRAYSCALE);
	imagepng($img,'image_mod.png');
	imagedestroy($img);
	echo "<img src='image_mod.png' />";
	echo "<button><a href='image_mod.png' style='text-decoration:none;' download='Image'>Download Image</a></button>";

