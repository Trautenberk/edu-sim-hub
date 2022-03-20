#ifndef __CONTBLOCK_H__
#define __CONTBLOCK_H__

#include "../ContinousSimulation/ContinousSimObject.hpp"
#include <memory>
#include <vector>

using namespace std;

class ContBlock : public ContinousSimObject {
    public:
        virtual double value() = 0;
};

class ContBlockSingle : public ContBlock {
    public: 
        ContBlockSingle(shared_ptr<ContBlock> _input);
        shared_ptr<ContBlock> input;
};

class ContBlockDouble : public ContBlock {
    public:
        ContBlockDouble(shared_ptr<ContBlock> _inputFirst, shared_ptr<ContBlock> _inputSecond);
        shared_ptr<ContBlock> inputFirst;
        shared_ptr<ContBlock> inputSecond;
};

class ContBlockMulti : public ContBlock {
    public: 
        ContBlockMulti(vector<shared_ptr<ContBlock>> inputs);
        vector<shared_ptr<ContBlock>> inputs;
};

#endif // __CONTBLOCK_H__