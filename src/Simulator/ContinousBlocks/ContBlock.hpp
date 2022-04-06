#ifndef __CONTBLOCK_H__
#define __CONTBLOCK_H__

#include "../ContinousSimulation/ContinousSimObject.hpp"
#include <memory>
#include <vector>
#include "ContBlockEngine.hpp"

using namespace std;

class ContBlock : public ContinousSimObject {
    public:
        ContBlock(shared_ptr<ContBlockEngine> engine);
        virtual double value() = 0;
        shared_ptr<ContBlockEngine> engine;
};

class ContBlockSingle : public ContBlock {
    public: 
        ContBlockSingle(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> _input);
        shared_ptr<ContBlock> input;
};

class ContBlockDouble : public ContBlock {
    public:
        ContBlockDouble(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> inputFirst, shared_ptr<ContBlock> inputSecond);
        shared_ptr<ContBlock> inputFirst;
        shared_ptr<ContBlock> inputSecond;
};

class ContBlockMulti : public ContBlock {
    public: 
        ContBlockMulti(shared_ptr<ContBlockEngine> engine, vector<shared_ptr<ContBlock>> inputs);
        vector<shared_ptr<ContBlock>> inputs;
};

#endif // __CONTBLOCK_H__