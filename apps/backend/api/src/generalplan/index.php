<?php
// $teams = json_decode(file_get_contents("./teams.json"));

require "../helpers/mysqlHandler.php";

set_error_handler("warning_handler", E_WARNING);

function warning_handler($errno, $errstr) { 
    header("HTTP/1.1 500 Internal Server Error");
    die('An Unexpected Error occurred');
}

// Read from DB
$sql = "SELECT * FROM `teams`;";
    
$teams = json_decode(selectFromDB($sql));

foreach ($teams as $team) {
    $url = str_replace('webcal://', 'https://', $team->{"url"});
    $team->{"data"} = file_get_contents($url);
    // $team->{"data"} = $url;
};



// RETURN VALUES
header('Content-Type: application/json; charset=utf-8');
echo json_encode($teams);

