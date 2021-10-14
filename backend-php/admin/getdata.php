<?php 
require "./jwtHandler.php";

// read token from query param
$tokenFromHeader = $_POST["token"] ?? "";

verifyJwt($tokenFromHeader);

$data = (object) [
    "val" => 'someValue',
    "data" => "some data here"
];

$returnValue = array();
array_push($returnValue, $data);
array_push($returnValue, $data);
array_push($returnValue, $data);

echo json_encode($returnValue);