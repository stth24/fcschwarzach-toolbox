<?php
define("DB_ADDRESS", "localhost"); 
define("DB_USERNAME", "root"); 
define("DB_PW", ""); 
define("DB_NAME", "fcschwarzach"); 


function getConnectionToDB() {
    $dbconn = new mysqli(DB_ADDRESS, DB_USERNAME, DB_PW, DB_NAME);
    
    if($dbconn->connect_error) {
        returnError($dbconn->connect_error);
    }

    return $dbconn;
}

function returnError($message) {
    header("HTTP/1.1 500 Internal Server Error");
    die("Connection failed: " . $message);
}

function selectFromDB($sql) {
    $dbconn = getConnectionToDB();
    
    $queryResult = $dbconn->query($sql);
    
    $result = array();
    
    while ($db_field = mysqli_fetch_assoc($queryResult)) {
        $result[] = $db_field;
    }

    $dbconn->close();

    return json_encode($result);
}

function insertUpdateIntoDB($sql) {
    $dbconn = getConnectionToDB();

    $queryResult = $dbconn->query($sql);

    if($queryResult === TRUE) {
        return $dbconn->insert_id;
    }
    else {
        $message = "Error: " . $sql . " -> " . $dbconn->error; 
        returnError($message);
    }

    $dbconn->close();
}

function deleteFromDB($sql) {
    $dbconn = getConnectionToDB();

    $queryResult = $dbconn->query($sql);

    if($queryResult !== TRUE) {
        $message = "Error: " . $sql . " -> " . $dbconn->error; 
        returnError($message);
    }

    $dbconn->close();
}