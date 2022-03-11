<?php 
require "./data/login_data.php";
require "./helpers/jwtHandler.php";

// print_r($_POST);

$name = $_POST['username'] ? $_POST['username'] : '';
$pw = $_POST['pw'] ? $_POST['pw'] :'';

// exit if username or pw is invalid
if($name != USERNAME || $pw != PASSWORD) {
    header("HTTP/1.1 401 Unauthorized");
    echo 'Username or PW invalid';
    exit;
}

$jwt = createJwt($name);

print_r($jwt);
