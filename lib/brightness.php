<?php
$encoded = $_POST['imgdata'];
$decoded = base64_decode($encoded);

	unlink("image_mod.png");
	unlink("image.png");

	file_put_contents('image.png', $decoded);
	$img = imagecreatefrompng('image.png');
	imagefilter($img, IMG_FILTER_BRIGHTNESS, 100);
	imagepng($img,'image_mod.png');
	imagedestroy($img);
	echo "<img src='image_mod.png' />";
	echo "<button><a href='image_mod.png' style='text-decoration:none;' download='Image'>Download Image</a></button>";

