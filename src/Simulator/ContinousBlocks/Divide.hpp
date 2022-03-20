#ifndef __DIVIDE_H__
#define __DIVIDE_H__

#include "ContBlock.hpp"
#include <memory>

using namespace std;

class Divide : public ContBlockDouble {
    public:
        Divide(shared_ptr<ContBlock> value, shared_ptr<ContBlock> divider);
};

#endif // __DIVIDE_H__