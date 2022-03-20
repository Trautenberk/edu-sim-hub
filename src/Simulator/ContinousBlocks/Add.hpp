#ifndef __ADD_H__
#define __ADD_H__

#include "ContBlock.hpp"

class Add : public ContBlockDouble {
    public:
        Add(shared_ptr<ContBlock> inputFirst, shared_ptr<ContBlock> inputSecond);

};

#endif // __ADD_H__