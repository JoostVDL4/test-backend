<?php

header("Content-Type: application/json; charset=utf-8");

$config = require __DIR__ . "/../config.local.php";

try {
    $database = new PDO(
        "mysql:host=" . $config["host"]
        . ";dbname=" . $config["database"]
        . ";charset=utf8mb4",
        $config["user"],
        $config["password"],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );

    $query = $database->query(
        "SELECT id, title, description, goal_amount FROM fundraisers"
    );

    $fundraisers = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($fundraisers);
} catch (PDOException $error) {
    error_log($error->getMessage());

    http_response_code(500);
    echo json_encode(["error" => "Database ophalen mislukt"]);
}