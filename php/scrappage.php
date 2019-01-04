<?php

header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

set_time_limit(0);


//echo "del file";
//echo $_REQUEST['file'];

if (file_exists('uploads/'.$_REQUEST['file'])) {
    unlink('uploads/'.$_REQUEST['file']);
    //echo 99;

}
$data['status']='success';
echo json_encode($data);

//}
?>