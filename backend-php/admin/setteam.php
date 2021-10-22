<?php 
require "./helpers/jwtHandler.php";
require "../helpers/mysqlHandler.php";


// read token from query param
$tokenFromHeader = $_POST["token"] ?? "";

verifyJwt($tokenFromHeader);



//insert into db
if(!empty($_POST["name"]) && !empty($_POST["url"])) {
    $teamname = $_POST["name"];
    $url = $_POST["url"];

    $sql = "INSERT INTO `teams` (`name`, `url`) VALUES ('". $teamname . "', '" . $url . "') ";
    $newid = insertUpdateIntoDB($sql);

    
    $selectsql = "SELECT * from `teams` WHERE `id` = " . $newid;
    
    $result = selectFromDB($selectsql);

    // RETURN VALUES
    header('Content-Type: application/json; charset=utf-8');

    echo $result;
}
else {
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid arguments for 'name' or 'url'!";
}


