#include "Sum.hpp"

Sum::Sum(shared_ptr<ContBlockEngine> engine, vector<shared_ptr<ContBlock>> &inputs) : ContBlockMulti(engine, inputs)
{}

void Sum::eval()
{}

double Sum::value()
{
    double result = 0;

    for(auto& input : inputs)
    {
        result += input->value();
    }
    
    return result;
}