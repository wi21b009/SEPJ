<?php
if (!isset($_SESSION)) {
    session_start();
}

require_once "./config/dataHandler.php";
require_once "./models/user.class.php";
require_once "./models/searchAgent.class.php";

$businessLogic = new BusinessLogic();
$businessLogic->processRequest();

class BusinessLogic
{

    private $dh;
    public function __construct()
    {
        $this->dh = new Datahandler();
    }

    public function processRequest()
    {
        // processes all requests

        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case "GET":
                $this->processGet();
                break;
            case "POST":
                $this->processPost();
                break;
            case "PUT":
                $this->processPut();
                break;
            case "DELETE":
                $this->processDelete();
                break;
            default:
                echo "Method not found";
        }
    }

    public function processGet()
    {
        // processes GET requests to backend?resource=XYZ

        if (!isset($_GET['resource'])) {
            $this->error(400, [], "Bad Request - no resource");
        }

        switch ($_GET['resource']) {
            case "getSearchAgents":
                $this->processGetSearchAgents();
                break;
            default:
                echo "Resource not found";
        }
    }

    public function processPost()
    {
        // processes POST requests to backend?action=XYZ

        if (!isset($_GET['action'])) {
            $this->error(400, [], "Bad Request - no action");
        }

        $data = json_decode(file_get_contents("php://input"));
        switch ($_GET['action']) {
            case "register":
                $this->processRegister($data);
                break;
            case "login":
                $this->processLogin($data);
                break;
            case "logout":
                $this->processLogout();
                break;
            case "checkIfUsernameIsAlreadyTaken":
                $this->processCheckIfUsernameIsAlreadyTaken($data);
                break;
            case "createSearchAgent":
                $this->processCreateSearchAgent($data);
                break;
            default:
                echo "Action not found";
        }
    }

    public function processPut()
    {
        if (!isset($_GET['action'])) {
            $this->error(400, [], "Bad Request - no action");
        }

        $data = json_decode(file_get_contents("php://input"));

        switch ($_GET['action']) {
            case "updateSearchAgent":
                $this->processUpdateSearchAgent($data);
                break;
            default:
                echo "Action not found";
        }

    }

    public function processDelete()
    {

        if (!isset($_GET['action'])) {
            $this->error(400, [], "Bad Request - no action");
        }

        $data = json_decode(file_get_contents("php://input"));

        switch ($_GET['action']) {
            case "deleteSearchAgent":
                $this->processDeleteSearchAgent($data);
                break;
            default:
                echo "Action not found";
        }

    }

    private function getCurrentUserId()
    {
        if (!isset($_SESSION["user"]) || !isset($_SESSION["user"]["user_id"])) {
            return null;
        } else {
            return $_SESSION["user"]["user_id"];
        }
    }

    private function processLogin($loginData)
    {

        // check json data
        if (!isset($loginData->username) || !isset($loginData->password)) {
            $this->error(400, [], "Bad Request - username & password are required!");
        }

        if (($result = $this->dh->getUser($loginData)) === false) {
            $this->error(400, [], "Bad Request - error logging in ");
        }

        // status code 201 = "login successful"
        $this->success(201, $result);

    }

    private function processRegister($data)
    {
        //print_r($data);

        // check json data
        if (!isset($data->username) || !isset($data->password) || !isset($data->email)) {
            $this->error(400, [], "Bad Request - email, first_name, last_name are required!");
        }

        //hashpassword
        $data->password = password_hash($data->password, PASSWORD_DEFAULT);

        $user = new User($data->username, $data->password, $data->email);

        if (($result = $this->dh->createUser($user)) === false) {
            $this->error(400, [], "Bad Request - error saving user");
        }

        // status code 201 = "created"
        $this->success(201, $result);
    }

    private function processLogout()
    {

        if (($result = $this->dh->logoutUser()) === false) {
            $this->error(400, [], "Bad Request - error logout");
        }
        $this->success(200, $result);

    }

    private function processCheckIfUsernameIsAlreadyTaken($userData)
    {
        $this->success(200, $this->dh->getUserByUsername($userData));

    }

    private function processCreateSearchAgent($searchAgentData)
    {
        $user_id = $this->getCurrentUserId();
        if ($user_id == null) {
            $this->error(400, [], "Not logged in!");
        }
        if (($result = $this->dh->createSearchAgent($user_id, $searchAgentData)) === false) {
            echo $result;
            $this->error(400, [], "Bad Request - There was an error creating the searchAgent");
        }
        $this->success(200, $result);
    }

    private function processGetSearchAgents()
    {
        $user_id = $this->getCurrentUserId();
        if ($user_id == null) {
            $this->error(400, [], "Not logged in!");
        }
        if (($result = $this->dh->getSearchAgents($user_id)) === false) {
            $this->error(400, [], "Bad Request - There was an error creating the searchAgent");
        }
        $this->success(200, $result);
    }

    private function processUpdateSearchAgent($searchAgentData)
    {
        $user_id = $this->getCurrentUserId();
        if ($user_id == null) {
            $this->error(400, [], "Not logged in!");
        }
        if (($result = $this->dh->updateSearchAgent($user_id, $searchAgentData)) === false) {
            $this->error(400, [], "Bad Request - There was an error updating the searchAgent");
        }
        $this->success(200, $result);
    }

    private function processDeleteSearchAgent($searchAgent_id)
    {
        $user_id = $this->getCurrentUserId();
        if ($user_id == null) {
            $this->error(400, [], "Not logged in!");
        }
        if (($result = $this->dh->deleteSearchAgent($user_id, $searchAgent_id)) === false) {
            $this->error(400, [], "Bad Request - There was an error deleting the searchAgent");
        }
        $this->success(200, $result);
    }

    private function success(int $code, $obj)
    {
        http_response_code($code);
        header('Content-Type: application/json');
        echo (json_encode($obj));
        exit;
    }

    private function error(int $code, array $headers, $msg)
    {
        http_response_code($code);
        foreach ($headers as $hdr) {
            header($hdr);
        }
        echo ($msg);
        exit;
    }

}
