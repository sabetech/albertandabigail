<?php
require_once('../vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://anagkazo.firstlovegallery.com/api/receive_message', [
                                                                                                    'form_params' => [
                                                                                                        'name' => $_POST['name'],
                                                                                                        'message' => $_POST['message'],
                                                                                                    ]
                                                                                                ]);

//echo $response->getStatusCode(); // 200
//echo $response->getHeaderLine('content-type'); // 'application/json; charset=utf8'
echo $response->getBody(); // '{"id": 1420053, "name": "guzzle", ...}'

//recieve input here ...

?>