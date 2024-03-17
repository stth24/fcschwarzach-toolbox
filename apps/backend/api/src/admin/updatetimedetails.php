<?php 
require "./helpers/jwtHandler.php";
require "../helpers/mysqlHandler.php";


// read token from query param
$tokenFromHeader = $_POST["token"] ? $_POST["token"] : "";

verifyJwt($tokenFromHeader);



//insert into db
if(!empty($_POST["id"]) && !empty($_POST["durationInMin"]) 
    && !empty($_POST["startTimeHour"]) && !empty($_POST["startTimeMinute"])
    && !empty($_POST["day"]) && !empty($_POST["location"])) {

    $id = $_POST["id"];
    $durationInMin = $_POST["durationInMin"];
    $startTimeHour = $_POST["startTimeHour"];
    $startTimeMinute = $_POST["startTimeMinute"];
    $day = $_POST["day"];
    $location = $_POST["location"];

    $sql = 
        "UPDATE `time_details` 
        SET `durationInMin`='" . $durationInMin . "',
            `startTimeHour`='" . $startTimeHour . "',
            `startTimeMinute`='" . $startTimeMinute . "',
            `day`='" . $day . "',
            `location`='" . $location . "' 
        WHERE `id` = " . $id;
    

    insertUpdateIntoDB($sql);
    
    echo "Update executed successfuly";
}
else {
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid arguments for 'id', 'name' or 'url'!";
}


