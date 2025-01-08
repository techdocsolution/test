<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $file = 'contact_details.txt';
    file_put_contents($file, $data['contactDetails'] . PHP_EOL, FILE_APPEND);
    echo json_encode(["status" => "success"]);
}
?>
