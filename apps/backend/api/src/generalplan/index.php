<?php
require "../helpers/mysqlHandler.php";

set_error_handler("warning_handler", E_WARNING);

function warning_handler($errno, $errstr)
{
    header("HTTP/1.1 500 Internal Server Error");
    die('An Unexpected Error occurred');
}

$result = file_get_contents("https://fcschwarzach.com/cockpit/api/collections/get/spielplan?token=ee267dda1fbfde50ed854fb6af19ca");
$teams = json_decode($result)->{"entries"};

foreach ($teams as $team) {
    $url = str_replace('webcal://', 'https://', $team->{"url"});
    $team->{"data"} = file_get_contents($url);
};


// RETURN VALUES
header('Content-Type: application/json; charset=utf-8');
echo json_encode($teams);
