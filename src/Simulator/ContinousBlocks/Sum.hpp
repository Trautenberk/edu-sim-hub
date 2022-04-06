#ifndef __SUM_H__
#define __SUM_H__

#include "ContBlock.hpp"
#include <memory>
#include <vector>

using namespace std;

class Sum : public ContBlockMulti
{
    public:
        Sum(shared_ptr<ContBlockEngine> engine, vector<shared_ptr<ContBlock>> &inputs);
        string objTypeName() {return "SumBlock";};
        void eval();
        double value();
};

#endif // __SUM_H__