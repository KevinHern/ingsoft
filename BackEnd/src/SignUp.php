<?php
include_once "DataBase.php";
require_once './vendor/autoload.php';
use Firebase\Auth\Token\Exception\InvalidToken;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
if ($_POST)
{
    $serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/netz-2ef86-firebase-adminsdk-8btj8-fafe5a7dd8.json');
    $firebase = (new Factory)
        ->withServiceAccount($serviceAccount)
        ->create();


    $idTokenString = $_POST['idToken'];
    $email = $_POST["email"];
    $pass= $_POST["pass"];
    $role = $_POST["role"];
    $status = "failed";
    $uid = "";
    header("Content-type: application/json");
    try {

        $verifiedIdToken = $firebase->getAuth()->verifyIdToken($idTokenString);
        $uid = $verifiedIdToken->getClaim('sub');
        $user = $firebase->getAuth()->getUser($uid);
        $db = new DataBase("client");
        $conn = $db->getConnection();
        $query = pg_query_params($conn,"insert into users (uid, email, password, role) values($1, $2, $3, $4)",
            array($uid, $email, $pass, $role))  ;
        $db->disconnect();
        // set response code - 200 OK
        http_response_code(200);
    } catch (InvalidToken $e) {
        $status = $e->getMessage();
    }
    catch (Exception $e) {
        http_response_code(400);
        $status = $e ->getMessage();
    }

    echo json_encode(array(
    "idToken" => $_POST,
    "uid" => $uid,
    "status" => $status
));
}
else
{
    // tell the user about error

    echo json_encode(["sent" => false, "message" => "Something went wrong"]);
}

