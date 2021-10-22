<?php 
require "./helpers/jwtHandler.php";


// read token from query param
$tokenFromHeader = $_POST["token"] ?? "";

verifyJwt($tokenFromHeader);

echo "Token is valid";