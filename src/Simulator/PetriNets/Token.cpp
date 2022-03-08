#include "Token.hpp"

int Token::_cnt = 0;

Token::Token()
{
    this->_id = Token::_cnt++;
}