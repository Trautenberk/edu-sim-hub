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
double Generator::Uniform()
{
    return Random() / (double) UINT_MAX;
}

// Generátor normálního rozložení
double Generator::Uniform(int a, int b)
{
    return (Uniform() * (b - a)) + a;
}


double Generator::Exponential(double rate)
{
    // rate = 1/lambda
    // x = -ln(u)/(λ)
    // x = -ln(u) * rate
    const auto u = Uniform();
    // return log(1 - u) / (-rate);
    return -log2(u) * rate;
}
