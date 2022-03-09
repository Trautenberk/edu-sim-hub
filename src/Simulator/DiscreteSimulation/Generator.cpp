#include "Generator.hpp"

const int Generator::_seed = 101010101010101;
const int Generator::_a = 69069;
const int Generator::_b = 1;
int Generator::_ix = Generator::_seed;

float Generator::Random(int mod)
{
    _ix = (_ix * _a) + _b;
    return  _ix / mod;
}

float Generator::Uniform()
{
    return rand() / RAND_MAX;
}

float Generator::Uniform(int a, int b)
{
    return (Uniform() * (b - a)) + a;
}

float Generator::Exponential()
{
    return 0;
}
