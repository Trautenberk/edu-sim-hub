#include "Sum.hpp"

const string sumTypeName = "SumBlock";

Sum::Sum(objectId id, ContBlockEngineObj engine) 
: ContBlockMulti(id, engine)
{}

ContBlockObj Sum::New(ContBlockEngineObj engine, vector<ContBlockObj> &inputs)
{
    auto obj = make_shared<Sum>(SimObject::createId(sumTypeName), engine);
    obj->setInputs(inputs);
    return obj;
}

string Sum::objTypeName()
{
    return sumTypeName;
}

void Sum::eval()
{}

double Sum::value()
{
    double result = 0;

    for(auto& input : this->_inputs)
    {
        result += input->value();
    }
    
    return result;
}