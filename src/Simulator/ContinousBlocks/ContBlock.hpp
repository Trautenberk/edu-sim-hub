#ifndef __CONTBLOCK_H__
#define __CONTBLOCK_H__

#include "../ContinousSimulation/ContinousSimObject.hpp"
#include <memory>
#include <vector>
#include "ContBlockEngine.hpp"

class ContBlock;

using ContBlockObj = std::shared_ptr<ContBlock>;
using namespace std;


class ContBlock : public ContinousSimObject {
    public:
        ContBlock(objectId, ContBlockEngineObj engine);
        virtual double value() = 0;
        ContBlockEngineObj engine;
};

class ContBlockSingle : public ContBlock {
    public: 
        ContBlockSingle(objectId id, ContBlockEngineObj engine, shared_ptr<ContBlock> _input);
        ContBlockObj input;
};

class ContBlockDouble : public ContBlock {
    public:
        ContBlockDouble(objectId id, ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond);
        ContBlockObj inputFirst;
        ContBlockObj inputSecond;
};

class ContBlockMulti : public ContBlock {
    public: 
        ContBlockMulti(objectId id, ContBlockEngineObj engine, vector<ContBlockObj> inputs);
        vector<ContBlockObj> inputs;
};

#endif // __CONTBLOCK_H__