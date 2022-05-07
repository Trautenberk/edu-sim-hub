#ifndef GENERATOR_H
#define GENERATOR_H

#include <cstdlib>
#include <climits>

using namespace std;

/**
 * @brief Generátor náhodných číst
 * 
 */
class Generator {
    public:
        /**
         * @brief Vrací náhodné číslo v rozsahu 0 - 0.9999...
         * 
         * @return double 
         */
        static double Random();
        /**
         * @brief Generuje normální rozložení
         * 
         * @param a 
         * @param b 
         * @return double 
         */
        static double Uniform(double a, double b);
        /**
         * @brief Generuje exponenciální rozložení
         * 
         * @param rate 
         * @return double 
         */
        static double Exponential(double rate);
    private:
        static const unsigned int _seed;
        static const unsigned int _a;
        static const unsigned int _b;
        static unsigned int _ix;
};

#endif