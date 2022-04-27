#ifndef __CONTBLOCK_H__
#define __CONTBLOCK_H__

#include "../ContinousSimulation/ContinousSimObject.hpp"
#include <memory>
#include <vector>
#include "ContBlockEngine.hpp"

class ContBlock;

using ContBlockObj = std::shared_ptr<ContBlock>;

template <typename T>
ContBlockObj createContBlockObj(objectId id, ContBlockEngine engine) {
    return make_shared<T>(id, engine);
}

class ContBlock : public ContinousSimObject {
    public:
        ContBlock(objectId id, ContBlockEngineObj engine);
        virtual double value() = 0;
        ContBlockEngineObj engine;
        void initialize() override;
};

class ContBlockSingle : public ContBlock {
    public: 
        ContBlockSingle(objectId, ContBlockEngineObj engine);
        void setInput(ContBlockObj input);
        void initialize() override;

    protected:
        ContBlockObj _input = nullptr;
};

class ContBlockDouble : public ContBlock {
    public:
        ContBlockDouble(objectId id, ContBlockEngineObj engine);
        void setInputs(ContBlockObj inputFirst, ContBlockObj inputSecond);
        void setInputFirst(ContBlockObj inputFirst);
        void setInputSecond(ContBlockObj inputSecond);

        void initialize() override;

    protected:
        ContBlockObj _inputFirst = nullptr;
        ContBlockObj _inputSecond = nullptr;
};

class ContBlockMulti : public ContBlock {
    public:
        ContBlockMulti(objectId id, ContBlockEngineObj engine); 
        void setInputs(vector<ContBlockObj> inputs);

    protected:
        std::vector<ContBlockObj> _inputs = {};
};

#endif // __CONTBLOCK_H__