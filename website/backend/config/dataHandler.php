<?php
error_reporting(0);
class Datahandler
{

    private function getDb()
    {
        // Creates a new mysqli connection and returns it
        include "./config/dbaccess.php";
     
       //$conn = pg_connect($servername, $username, $password, $dbname);
       $conn = pg_connect("host=$servername dbname=$dbname user=$username password=$password port=$port");

        if (!$conn) {
            printf("Connect failed\n");
            exit();
        }
        // echo("Connected successfully\n");
        return $conn;
    }

    private function handleError($db_obj)
    {
        if ($db_obj->error) {
            printf("Error message: %s\n", $db_obj->error);
            exit();
        }
    }

    function getUser($loginData)
    {
        $user = array();
        // connect to postgres:
        $db_obj = $this->getDb();

        // run the query
        $sql = "SELECT id, username, password, email from users where username = $1";
        $stmt = pg_prepare($db_obj, "", $sql);

        // if ($stmt) {
        //     $result = pg_execute($db_obj, "", array($loginData->username));
        //     if ($row = pg_fetch_assoc($result)) {
        //         $user_id = $row['id'];
        //         $username = $row['username'];
        //         $currentPassword = $row['password'];
        //         $email = $row['email'];
        //         $is_active = $row['is_active'];
        //         // ...
        //     }
        // }
        if ($stmt) {
            $result = pg_execute($db_obj, "", array($loginData->username));
            if ($row = pg_fetch_assoc($result)) {
                // Check if the entered password matches the password from the database
                $isPasswordCorrect = password_verify($loginData->password, $row['password']);

                if ($isPasswordCorrect) {
                    session_start();

                    $user = new User($row['username'], $row['password'], $row['email'], $row['is_active']);

                    $_SESSION["user"]["user_id"] = $row['id'];
                    $_SESSION["user"]["username"] = $row['username'];
                }
            }
            return $user;
        }
        
        pg_close($db_obj);
    }

    function createUser($userdata)
    {
        if ($this->getUserByUsername($userdata)) {
            // username already used
            return false;
        }
        $db_obj = $this->getDb();

        $sql = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)";
        $stmt = pg_prepare($db_obj, "", $sql);
        if (!$stmt) {
            $this->handleError($db_obj);
        }

        $params = array($userdata->username, $userdata->password, $userdata->email);
        $result = pg_execute($db_obj, "", $params);

        if ($result) {
            //close the connection
            pg_close($db_obj);
            return true;
        } else {
            echo htmlspecialchars(pg_last_error($db_obj));
            //close the connection
            pg_close($db_obj);
            return false;
        }

    }

    function logoutUser()
    {
        if (!isset($_SESSION)) {
            session_start();
        }

        unset($_SESSION["user"]["user_id"]);
        unset($_SESSION["user"]["username"]);

        return true;

    }

    function getUserByUsername($userData)
    {

        $db_obj = $this->getDb();

        $sql = "SELECT 1 FROM users WHERE username = $1";
        $stmt = pg_prepare($db_obj, "", $sql);
        if (!$stmt) {
            $this->handleError($db_obj);
        }

        $params = array($userData->username);
        $result = pg_execute($db_obj, "", $params);

        if ($result) {
            if (pg_fetch_row($result)) {
                return true;
            } else {
                return false;
            }
        }
        pg_close($db_obj);
    }

    

    function createSearchAgent($user_id, $searchAgentData)
    {
        $db_obj = $this->getDb();
        //TODO:define query
        $sql = "INSERT INTO searchAgents() VALUES ($1, $2, $3, $4, $5, $6)";
        $stmt = pg_prepare($db_obj, "", $sql);
        if (!$stmt) {
            $this->handleError($db_obj);
        }

        $regions = join(",", $searchAgentData->regions);
        //bind params
        $params = array($param1, $param2, $param3, $param4, $param5, $param6); // Replace $param1, $param2, ... with actual values
        $result = pg_execute($db_obj, "", $params);

        if ($result) {
            pg_close($db_obj);
            return true;
        } else {
            echo htmlspecialchars(pg_last_error($db_obj));
            pg_close($db_obj);
            return false;
        }
    }

    function updateSearchAgent($user_id, $searchAgentData)
    {
        $db_obj = $this->getDb();
        //TODO:define query
        $sql = "UPDATE searchAgents SET ....... WHERE userId = $1 AND id = $2";
        $stmt = pg_prepare($db_obj, "", $sql);
        if (!$stmt) {
            $this->handleError($db_obj);
        }

        $districts = join(",", $searchAgentData->districts);
        //bind params
        $params = array($user_id, $searchAgent_id);
        $result = pg_execute($db_obj, "", $params);

        if ($result) {
            pg_close($db_obj);
            return true;
        } else {
            echo htmlspecialchars(pg_last_error($db_obj));
            pg_close($db_obj);
            return false;
        }
    }

    function deleteSearchAgent($user_id, $searchAgent_id)
    {
        $db_obj = $this->getDb();

        $sql = "DELETE FROM searchAgents WHERE userId = $1 AND id = $2";
        $stmt = pg_prepare($db_obj, "", $sql);
        if (!$stmt) {
            $this->handleError($db_obj);
        }

        $params = array($user_id, $searchAgent_id);
        $result = pg_execute($db_obj, "", $params);

        if ($result) {
            pg_close($db_obj);
            return true;
        } else {
            echo htmlspecialchars(pg_last_error($db_obj));
            pg_close($db_obj);
            return false;
        }
    }

    function getSearchAgents($user_id)
    {
        // Prepare the array we will return in the end:
        $searchAgents = array();

        // connect to postgres:
        $db_obj = $this->getDb();

        //TODO:define query
        $sql = "SELECT * FROM searchAgents WHERE userId = $1 ORDER BY id DESC";
        $stmt = pg_prepare($db_obj, "", $sql);
        if (!$stmt) {
            $this->handleError($db_obj);
        }

        $params = array($user_id);
        $result = pg_execute($db_obj, "", $params);

        // loop through all results
        while ($row = pg_fetch_assoc($result)) {
            // TODO: convert it into a SearchAgent instance
            // $searchAgent = new SearchAgent(

            // );

            // and add it to the array
            array_push($searchAgents, $searchAgent);
        }

        // close the connection
        pg_close($db_obj);

        // finally return all searchAgents
        return $searchAgents;
    }


}