<?php 
require "./helpers/jwtHandler.php";
require "../helpers/mysqlHandler.php";


// read token from query param
$tokenFromHeader = $_POST["token"] ? $_POST["token"] : "";

verifyJwt($tokenFromHeader);



//insert into db
if(!empty($_POST["name"])) {
    $eventname = $_POST["name"];

    $sql = "INSERT INTO `weekly_event` (`name`) VALUES ('". $eventname . "') ";
    $newid = insertUpdateIntoDB($sql);

    
    $selectsql = "SELECT * from `weekly_event` WHERE `id` = " . $newid;
    
    $result = selectFromDB($selectsql);
    
    $resultAsObject = json_decode($result, true);

    $resultAsObject[0]['timeDetails'] = array();

    // RETURN VALUES
    header('Content-Type: application/json; charset=utf-8');

    echo json_encode($resultAsObject);
}
else {
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid argument for 'name'!";
}


