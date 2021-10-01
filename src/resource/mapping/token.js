module.exports = {
    INSERT_TOKEN: 'INSERT INTO token (name, public_key, private_key, time_stamp) VALUES ({name}, {public_key}, {private_key}, {time_stamp})',
    DELETE_TOKEN: 'DELETE FROM token WHERE name = {name}',
    SELECT_TOKEN: 'SELECT name, private_key, time_stamp FROM token WHERE name = {name}',
    SELECT_PASSWORD: 'SELECT name, password FROM user WHERE name = {name}',
    SAVE_ACCESS_TOKEN: 'UPDATE token SET token = {token} WHERE name = {name}',
}