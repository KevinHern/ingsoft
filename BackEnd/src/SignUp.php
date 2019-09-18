<?php
include_once "DataBase.php";
require_once './vendor/autoload.php';
require_once  'Permission.php';
use Firebase\Auth\Token\Exception\InvalidToken;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
permission();
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
if ($_POST)
{
//    Create Service Account To work with firebase
    $serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/netz-2ef86-firebase-adminsdk-8btj8-fafe5a7dd8.json');
    $firebase = (new Factory)
        ->withServiceAccount($serviceAccount)
        ->create();
    ;
    //Check for Token given by firebase
    $idTokenString = $_POST['idToken'];
    $email = $_POST["email"];
    $pass= $_POST["pass"];
    $role = $_POST["role"];
    $status = "failed";
    $uid = "";


    header("Content-type: application/json");


    try {
    //Check for Token validity
        $verifiedIdToken = $firebase->getAuth()->verifyIdToken($idTokenString);
    //Look for uid
        $uid = $verifiedIdToken->getClaim('sub');
//        I don't know what they mean by these, i guess email and password
//        When I do signIn I'll check
//        $user = $firebase->getAuth()->getUser($uid);
        $db = new DataBase("admin");
        $conn = $db->getConnection();
//       Save User in local database
        $query = pg_query_params($conn,"insert into users(uid, email, password, role, type) values($1, $2, $3, $4,1)",
            array($uid, $email, $pass, $role))  ;
        $db->disconnect();
        // set response code - 200 OK
        http_response_code(200);
        $status = "ok";
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

