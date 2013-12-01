<?php

// PNG image

header('Content-type: image/jpeg');
header('Content-Disposition: attachment; filename="' . $_POST['name'] . '"');

// capture, replace any spaces w/ plusses, and decode

$encoded = $_POST['imgdata'];
// $encoded = str_replace(' ', '+', $encoded);
$decoded = base64_decode($encoded);

// write decoded data
echo $decoded;


// if(!file_exists('dw-bw.png')) {
// 	$img = imagecreatefrompng('dw-manipulate-me.png');
// 	imagefilter($img,IMG_FILTER_GRAYSCALE);
// 	imagepng($img,'db-bw.png');
// 	imagedestroy($img);
// 	echo "<img src='db-bw.png' />";
// }

// file_put_contents('image.jpeg', $decoded);


//TODO 
// დავწერო ისეთი მეთოდი რომელიც ჯავასკრიპტს გამოაყოლებს რამეს, რითაც ეფექტს დავადგენ..
// მოვძებნო სურათი ჰედერს როგორ გავაყოლო
// ან echo surati და მერე გამოდწერა. <--- ეს ვარიანტი ჯობს..