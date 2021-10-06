<?php
// header("Access-Control-Allow-Origin: *");

$teams = json_decode(file_get_contents("./teams.json"));

$arr = array();

foreach ($teams as $team) {
    $url = str_replace('webcal://', 'https://', $team->{"url"});

    $team->{"data"} = file_get_contents($url);
};

echo json_encode($teams);

// expect output to be like:
// [
//     {
//        "name": "<team_name>",
//        "url": "<url_to_team_ical_file>",
//        "data": "<content_of_ical_file>" 
//     },
//     {
//         "name": "<team_name>",
//         "url": "<url_to_team_ical_file>",
//         "data": "<content_of_ical_file>" 
//     },
//     ...
// ]

