#include <gtest/gtest.h>
#include "../../IntegrationMethods/IntegrationMethods.hpp"
#include <iostream>
#include "../../ContinousBlocks/ContBlockEngine.hpp"
#include "../../ContinousBlocks/Constant.hpp"
#include "../../ContinousBlocks/Add.hpp"
#include "../../ContinousBlocks/Integrator.hpp"
#include "../../ContinousBlocks/Time.hpp"
#include "../../ContinousBlocks/Mul.hpp"
#include "../../ContinousBlocks/Gain.hpp"


TEST(CheckInititialisationError, BasicAssertions)
{
    auto engine = ContBlockEngine::New(IntegrationMethods::Euler);
    auto add = Add::New(engine);

    ASSERT_FALSE(engine->init(10, 0.1));
    ASSERT_NO_THROW(engine->simulate());
}

TEST(SimplSimTest, BasicAssertions)
{
    auto engine = ContBlockEngine::New(IntegrationMethods::Euler); 
    auto constantOne = Constant::New(engine, 1);
    auto constantTwo = Constant::New(engine, 2);
    auto addBlock = Add::New(engine, constantOne, constantTwo);

    auto sample = [engine, constantOne, constantTwo, addBlock](){
        std::cout << "Time:" << engine->time() << " ConstantOne: " << constantOne->value() << " ConstantTwo: " << constantTwo->value() << " AddBlock: " << addBlock->value() << std::endl;
    };

    engine->Sample = sample;

    engine->init(10.0, 0.01);
    std::cout << "Simulation begin" << std::endl;
    engine->simulate();
    std::cout << "Simulation end" << std::endl;

}


TEST(SimWithIntegratorOne, BasicAssertions)
{
    auto engine = ContBlockEngine::New(IntegrationMethods::Euler); 
    auto constant = Constant::New(engine, 1);   // y` = 1
    auto integrator = Integrator::New(engine, 0.0, constant); // y = x   

    std::cout.precision(17);
    auto sample = [engine, integrator](){
        std::cout << "Time:" << engine->time() << " Integrator: " << integrator->value() << std::endl;
    };

    engine->Sample = sample;

    engine->init(10.0, 0.01);
    std::cout << "Simulation begin" << std::endl;
    engine->simulate();
    std::cout << "Simulation end" << std::endl;
}

TEST(SimWithIntegratorTwo, BasicAssertions)
{
    auto engine = ContBlockEngine::New(IntegrationMethods::Euler); 
    auto constant = Constant::New(engine, 2);   // 2
    auto x = Time::New(engine);         // x
    auto mul = Mul::New(engine, constant, x);  // x * 2
    auto integrator = Integrator::New(engine, 0.0, mul);    // y` = x na 2

    std::cout.precision(5);
    auto sample = [engine, integrator, x, mul](){
        std::cout 
        << " Time:" << engine->time()
        << ", x: " << x->value()
        << ", x * 2 = " << mul->value()
        << ", Integrator: " << integrator->value()
        << std::endl;
    };

    engine->Sample = sample;

    engine->init(10.0, 0.01, 20);
    std::cout << "Simulation begin" << std::endl;
    engine->simulate();
    std::cout << "Simulation end" << std::endl;
}



TEST(test, BasicAssertions)
{
    auto engine = ContBlockEngine::New(IntegrationMethods::Euler); 
    auto constant = Constant::New(engine, 2);  
    auto integrator_one = Integrator::New(engine, 0);
    auto integrator_two = Integrator::New(engine, 0);
    
    auto gain = Gain::New(engine, 3, constant);

    auto constantTwo = Constant::New(engine, 5);

    // auto add = Add::New(engine, gain, constantTwo);
    auto add = make_shared<Add>("aaa",engine);
    
    auto test = Gain::New(engine, 5, add);

    engine->init(10.0, 0.01, 20);
    std::cout << "Simulation begin" << std::endl;
    engine->simulate();
    std::cout << "Simulation end" << std::endl;
}