#ifndef GENERATOR_H
#define GENERATOR_H

#include <cstdlib>

using namespace std;
class Generator {
    public:
        static float Random(int mod);
        static float Uniform();
        static float Uniform(int a, int b);
        static float Exponential();
    private:
        static const int _seed;
        static const int _a;
        static const int _b;
        static int _ix;
};

#endif