#ifndef GENERATOR_H
#define GENERATOR_H

#include <cstdlib>
#include <math.h>
#include <climits>

using namespace std;
class Generator {
    public:
        static unsigned Random(unsigned int mod = UINT_MAX);
        static double Uniform();
        static double Uniform(int a, int b);
        static double Exponential(double rate);
    private:
        static const int _seed;
        static const int _a;
        static const int _b;
        static int _ix;
};

#endif