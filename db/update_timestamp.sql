update users
set last_login = CURRENT_TIMESTAMP(1)
where user_id = $1;