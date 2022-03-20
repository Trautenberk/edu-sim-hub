#ifndef __CONSTANT_H__
#define __CONSTANT_H__

#include "ContBlock.hpp"
#include <memory>

using namespace std;

class Constant : public ContBlock
{
    public:
        Constant(double value);
        void eval() {/*Prazdny TODO*/};
        double value() {return this->_value;};
        string getObjType() {return "ConstantContBlock";};
    private: 
        double _value;
};


#endif // __CONSTANT_H__