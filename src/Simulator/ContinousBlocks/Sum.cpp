#include "Sum.hpp"

const string sumTypeName = "SumBlock";

Sum::Sum(objectId id, ContBlockEngineObj engine, vector<ContBlockObj> &inputs) 
: ContBlockMulti(id, engine, inputs)
{}

Sum::Sum(ContBlockEngineObj engine, vector<ContBlockObj> &inputs)
: Sum(SimObject::createId(sumTypeName), engine, inputs)
{}

string Sum::objTypeName()
{
    return sumTypeName;
}

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