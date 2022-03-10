#include "Generator.hpp"

const int Generator::_seed = 10101010101;
const int Generator::_a = 69069;
const int Generator::_b = 1;
int Generator::_ix = Generator::_seed;

// Generátor náhodných čísel
unsigned int Generator::Random(unsigned int mod)
{
    _ix = (_ix * _a) + _b;
    return  _ix % mod;
}

// Generátor normálního rozložení v rozsahu 0-1
float Generator::Uniform()
{
    return Random() / (float) UINT_MAX;
}

// Generátor normálního rozložení
float Generator::Uniform(int a, int b)
{
    return (Uniform() * (b - a)) + a;
}


float Generator::Exponential(float rate)
{
    // x = log(1-u)/(-λ)
    const auto u = Uniform();
    return log(1 - u) /(-rate);
}
