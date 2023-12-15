<?php
class User {
    //public $id;
    public $username;
    public $password;
    public $email;
    public $is_active;

    function __construct(/*$id,*/ $username, $password, $email, $is_active) {
        //$this->id = $id;
        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
        $this->is_active = true;
      }

}