#include <gtest/gtest.h>
#include "../../IntegrationMethods/IntegrationMethods.hpp"
#include <iostream>
#include "../../ContinousBlocks/ContBlockEngine.hpp"
#include "../../ContinousBlocks/Constant.hpp"
#include "../../ContinousBlocks/Add.hpp"
#include "../../ContinousBlocks/Integrator.hpp"
#include "../../ContinousBlocks/Time.hpp"

TEST(SimplSimTest, BasicAssertions)
{
    auto engine = make_shared<ContBlockEngine>(IntegrationMethods::Euler); 
    auto constantOne = make_shared<Constant>(engine, 1);
    auto constantTwo = make_shared<Constant>(engine, 2);
    auto addBlock = make_shared<Add>(engine, constantOne, constantTwo);

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
    auto engine = make_shared<ContBlockEngine>(IntegrationMethods::Euler); 
    auto constant = make_shared<Constant>(engine, 1);
    auto integrator = make_shared<Integrator>(engine, constant, 0.0);

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
    auto engine = make_shared<ContBlockEngine>(IntegrationMethods::Euler); 
    auto constant = make_shared<Constant>(engine, 2);   // 2
    auto x = make_shared<Time>(engine);         // x
    auto sum = make_shared<Add>(engine, constant, x);  // x + 2
    auto integrator = make_shared<Integrator>(engine, sum, 0.0);    // y` = x + 2


    auto sample = [engine, integrator, x, sum](){
        std::cout 
        << " Time:" << engine->time()
        << " x: " << x->value()
        << " x + 2: " << sum->value()
        << " Integrator: " << integrator->value()
        << std::endl;
    };

    engine->Sample = sample;

    engine->init(10.0, 0.1);
    std::cout << "Simulation begin" << std::endl;
    engine->simulate();
    std::cout << "Simulation end" << std::endl;

}