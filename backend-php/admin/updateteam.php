<?php 
require "./helpers/jwtHandler.php";
require "../helpers/mysqlHandler.php";


// read token from query param
$tokenFromHeader = $_POST["token"] ?? "";

verifyJwt($tokenFromHeader);



//insert into db
if(!empty($_POST["id"]) && !empty($_POST["name"]) && !empty($_POST["url"])) {
    $id = $_POST["id"];
    $teamname = $_POST["name"];
    $url = $_POST["url"];

    $sql = "UPDATE `teams` SET `name`='" . $teamname . "',`url`='" . $url . "' WHERE `id` = " . $id;
    insertUpdateIntoDB($sql);

    
    echo $sql . " -> Executed successfuly";
}
else {
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid arguments for 'id', 'name' or 'url'!";
}


