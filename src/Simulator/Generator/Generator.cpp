#include "Generator.hpp"

const unsigned int Generator::_seed = 1523548434;
const unsigned int Generator::_a = 69069;
const unsigned int Generator::_b = 1;
unsigned int Generator::_ix = Generator::_seed;

// Generátor pseudo-náhodných čísel v rozsahu 0 - 0.999999
unsigned int Generator::Random()
{
    _ix = (_ix * _a) + _b;
    return  _ix % UINT_MAX;
}

// Generátor normálního rozložení v rozsahu a - b
double Generator::Uniform(double a, double b)
{
    return a +(b - a) * Random();
}


double Generator::Exponential(double mean)
{
    const auto u = Random();
    return  -mean * log(u);
}
