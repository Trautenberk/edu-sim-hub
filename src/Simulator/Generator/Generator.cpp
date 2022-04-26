#include "Generator.hpp"

const unsigned int Generator::_seed = 1523548434;
const unsigned int Generator::_a = 69069;
const unsigned int Generator::_b = 1;
unsigned int Generator::_ix = Generator::_seed;

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


double Generator::Exponential(double mean)
{
    // mean = 1/lambda
    // x = -ln(u)/(λ)
    // x = -ln(u) * rate
    const auto u = Uniform();
    // return log(1 - u) / (-rate);
    return  -mean * log(u);
}
