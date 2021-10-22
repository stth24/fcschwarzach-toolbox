<?php 
require "../helpers/mysqlHandler.php";

// Read from DB
$sql = "SELECT * FROM `teams`;";
    
$result = selectFromDB($sql);

// RETURN VALUES
header('Content-Type: application/json; charset=utf-8');

echo $result;