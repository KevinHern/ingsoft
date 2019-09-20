<?php

require_once './vendor/autoload.php';
require_once  'Permission.php';
use Firebase\Auth\Token\Exception\InvalidToken;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;


function getUid($token) {
    $serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/netz-2ef86-firebase-adminsdk-8btj8-fafe5a7dd8.json');
    $firebase = (new Factory)
        ->withServiceAccount($serviceAccount)
        ->create();
    try {
        //Check for Token validity
        $verifiedIdToken = $firebase->getAuth()->verifyIdToken($token);
        //Look for uid
        return $verifiedIdToken->getClaim('sub');
    }catch(InvalidToken $e){
        return "No es un Token Valido";
    }
}


