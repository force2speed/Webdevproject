<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Your existing code...
?>
<?php
// login.php

// Start the session
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validate credentials (this is a basic example; use proper validation and database checks in production)
    $valid_email = "user@example.com";
    $valid_password = "password123";

    if ($email === $valid_email && $password === $valid_password) {
        // Set session variables
        $_SESSION['loggedin'] = true;
        $_SESSION['email'] = $email;

        // Redirect to a dashboard or home page
        header("Location: index2.html");
        exit;
    } else {
        // Invalid credentials
        echo "Invalid email or password.";
    }
}
?>