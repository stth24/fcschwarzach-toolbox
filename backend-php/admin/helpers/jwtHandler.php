<?php 
require "vendor/autoload.php";
use Firebase\JWT\JWT;

require "./data/secret_jwt_key.php";


function createJwt($username) {
    $now = new DateTime();
    $expiresInSeconds = 60 * 60;
    
    $payload = array(
        "iss" => 'http://fcschwarzach.com',
        "iat" => $now->getTimestamp(),
        "exp" => $now->getTimestamp() + $expiresInSeconds,
        "name" => $username,
        "jti" => $username . "_" . $now->getTimestamp()
    );
    
    $jwt = JWT::encode($payload, SECRET_KEY);
    
    return $jwt;
}

function verifyJwt($token) {
    try {
        $decoded = JWT::decode($token, SECRET_KEY, array('HS256'));
        // print_r($decoded);
    } 
    catch(Exception $e){
        header("HTTP/1.1 401 Unauthorized");
        echo 'Caught exception: ',  $e->getMessage(), "\n";

        // exit programm
        exit;
    }
}