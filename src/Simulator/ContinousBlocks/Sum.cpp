#include "Sum.hpp"

Sum::Sum(vector<shared_ptr<ContBlock>> &inputs) : ContBlockMulti(inputs)
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