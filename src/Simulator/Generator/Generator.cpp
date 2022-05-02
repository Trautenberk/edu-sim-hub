#include "Generator.hpp"
#include <cmath>


const unsigned int Generator::_seed = 1523548434;
const unsigned int Generator::_a = 69069;
const unsigned int Generator::_b = 1;
unsigned int Generator::_ix = Generator::_seed;

// Generátor pseudo-náhodných čísel v rozsahu 0 - 0.999999
double Generator::Random()
{
    _ix = (_ix * _a) + _b;
    return  _ix / (double)UINT_MAX;
}

// Generátor normálního rozložení v rozsahu a - b
double Generator::Uniform(double a, double b)
{
    return a +(b - a) * Random();
}


double Generator::Exponential(double mean)
{
    const double u = Random();
    auto value = -mean * std::log(1.0 - u); 

    auto test = 0;
    return  value;
}
