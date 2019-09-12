<?php
require_once './vendor/autoload.php';
require_once  'Permission.php';
use Firebase\Auth\Token\Exception\InvalidToken;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
permission();


function verify($idToken) {
    $serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/netz-2ef86-firebase-adminsdk-8btj8-fafe5a7dd8.json');
    $firebase = (new Factory)
        ->withServiceAccount($serviceAccount)
        ->create();
    try {
        $verifiedIdToken = $firebase->getAuth()->verifyIdToken($idToken);
        $uid = $verifiedIdToken->getClaim('sub');
//        $user = $firebase->getAuth()->getUser($uid);
        return $uid;
    }catch (InvalidToken $e){
            return false;
    }
    catch (Exception $e) {
        http_response_code(400);
        return false;
    }
}


