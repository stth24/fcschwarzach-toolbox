<?php 
require "./helpers/jwtHandler.php";
require "../helpers/mysqlHandler.php";


// read token from query param
$tokenFromHeader = $_POST["token"] ? $_POST["token"] : "";

verifyJwt($tokenFromHeader);



//insert into db
if(!empty($_POST["id"]) && !empty($_POST["name"])) {
    $id = $_POST["id"];
    $eventname = $_POST["name"];

    $sql = "UPDATE `weekly_event` SET `name`='" . $eventname . "' WHERE `id` = " . $id;
    insertUpdateIntoDB($sql);

    
    echo "Update executed successfuly";
}
else {
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid arguments for 'id', 'name' or 'url'!";
}


