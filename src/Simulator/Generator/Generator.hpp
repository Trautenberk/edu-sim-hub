#ifndef GENERATOR_H
#define GENERATOR_H

#include <cstdlib>
#include <math.h>
#include <climits>

using namespace std;
class Generator {
    public:
        static unsigned int Random(unsigned int mod = UINT_MAX);
        static double Uniform();
        static double Uniform(int a, int b);
        static double Exponential(double rate);
    private:
        static const unsigned int _seed;
        static const unsigned int _a;
        static const unsigned int _b;
        static unsigned int _ix;
};

#endif