<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Debug: Log received data
    error_log("Email: $email, Password: $password");

    // Hardcoded validation (replace with database check)
    $valid_email = "user@example.com";
    $valid_password = "password123";

    if ($email === $valid_email && $password === $valid_password) {
        $_SESSION['loggedin'] = true;
        $_SESSION['email'] = $email;
        echo json_encode(['status' => 'success', 'message' => 'Login successful!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email or password.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>