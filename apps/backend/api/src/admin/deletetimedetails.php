<?php 
require "./helpers/jwtHandler.php";
require "../helpers/mysqlHandler.php";


// read token from query param
$tokenFromHeader = $_POST["token"] ? $_POST["token"] : "";

verifyJwt($tokenFromHeader);



//insert into db
if(!empty($_POST["id"])) {
    $id = $_POST["id"];

    $sql = "DELETE FROM `time_details` WHERE `id` = " . $id;
    deleteFromDB($sql);

    echo "Delete executed successfuly";
}
else {
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid argument for 'id'!";
}


