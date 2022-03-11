<?php 
require "./helpers/jwtHandler.php";
require "../helpers/mysqlHandler.php";


// read token from query param
$tokenFromHeader = $_POST["token"] ? $_POST["token"] : "";

verifyJwt($tokenFromHeader);



//insert into db
if(!empty($_POST["weeklyEventid"]) && !empty($_POST["durationInMin"]) 
    && !empty($_POST["startTimeHour"]) && !empty($_POST["startTimeMinute"])
    && !empty($_POST["day"]) && !empty($_POST["location"])) {
    $weeklyEventid = $_POST["weeklyEventid"];
    $durationInMin = $_POST["durationInMin"];
    $startTimeHour = $_POST["startTimeHour"];
    $startTimeMinute = $_POST["startTimeMinute"];
    $day = $_POST["day"];
    $location = $_POST["location"];

    $sql = 
        "INSERT INTO `time_details` (
            `weeklyEventid`,
            `durationInMin`,
            `startTimeHour`,
            `startTimeMinute`,
            `day`,
            `location`
        ) 
        VALUES (
            '" . $weeklyEventid . "', 
            '" . $durationInMin . "',
            '" . $startTimeHour . "',
            '" . $startTimeMinute . "',
            '" . $day . "',
            '" . $location . "'
        ) ";
        
    $newid = insertUpdateIntoDB($sql);

    
    $selectsql = "SELECT * from `time_details` WHERE `id` = " . $newid;
    
    $result = selectFromDB($selectsql);

    // RETURN VALUES
    header('Content-Type: application/json; charset=utf-8');

    echo $result;
}
else {
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid arguments!";
}


