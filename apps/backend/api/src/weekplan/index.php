<?php

require "../helpers/mysqlHandler.php";

// Read from DB
$weeklyEventsSQL = "SELECT * FROM `weekly_event`;";
    
$weeklyEventsResult = selectFromDB($weeklyEventsSQL);


$timeDetailsSQL = "SELECT * FROM `time_details`";

$timeDetailsResult = selectFromDB($timeDetailsSQL);

$resultAsArray = json_decode($weeklyEventsResult, true);
    
for ($i = 0; $i < count($resultAsArray); $i++) {
    $arr = array();

    foreach(json_decode($timeDetailsResult, true) as $detail) {
        if($resultAsArray[$i]['id'] == $detail['weeklyEventid']) {
            array_push($arr, $detail);
        }
    }

    $resultAsArray[$i]['timeDetails'] = $arr;
}


// RETURN VALUES
header('Content-Type: application/json; charset=utf-8');

echo json_encode($resultAsArray);