#ifndef __DIV_H__
#define __DIV_H__

#include "ContBlock.hpp"
#include <memory>

using namespace std;

class Div : public ContBlockDouble {
    public:
        Div(objectId id, ContBlockEngineObj engine);
        static ContBlockObj New(ContBlockEngineObj engine);
        static ContBlockObj New(ContBlockEngineObj engine, ContBlockObj value, ContBlockObj divider);

        string objTypeName();
        void eval();
        double value();
};

#endif // __DIV_H__