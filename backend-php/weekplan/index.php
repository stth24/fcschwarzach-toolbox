<?php

$asjson = json_decode(file_get_contents("./data.json"), true);

// RETURN VALUES
header('Content-Type: application/json; charset=utf-8');
echo json_encode($asjson);