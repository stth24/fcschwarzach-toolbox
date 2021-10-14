<?php 
require "./jwtHandler.php";

// print_r($_POST);

$name = $_POST['username'] ?? '';
$pw = $_POST['pw'] ?? '';

// exit if username or pw is invalid
if($name != 'myname@domain.com' || $pw != 'password') {
    echo 'Username or PW invalid';
    header("HTTP/1.1 401 Unauthorized");
    exit;
}

$jwt = createJwt($name);

print_r($jwt);

