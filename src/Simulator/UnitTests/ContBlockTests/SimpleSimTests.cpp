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

    ASSERT_FALSE(engine->init(0, 10, 0.1));
    ASSERT_NO_THROW(engine->simulate());
}

TEST(SimplSimTest, BasicAssertions)
{
    auto engine = ContBlockEngine::New(IntegrationMethods::Euler); 
    auto constantOne = Constant::New(engine, 1);
    auto constantTwo = Constant::New(engine, 2);
    auto addBlock = Add::New(engine, constantOne, constantTwo);

    engine->init(0, 10.0, 0.01);
    engine->simulate();
}


TEST(SimWithIntegratorOne, BasicAssertions)
{
    auto engine = ContBlockEngine::New(IntegrationMethods::Euler); 
    auto constant = Constant::New(engine, 1);   // y` = 1
    auto integrator = Integrator::New(engine, 0.0, constant); // y = x   

    engine->init(0, 10.0, 0.01);
    engine->simulate();
}

TEST(SimWithIntegratorTwo, BasicAssertions)
{
    auto engine = ContBlockEngine::New(IntegrationMethods::Euler); 
    auto constant = Constant::New(engine, 2);   // 2
    auto x = Time::New(engine);         // x
    auto mul = Mul::New(engine, constant, x);  // x * 2
    auto integrator = Integrator::New(engine, 0.0, mul);    // y` = x na 2

    engine->init(0, 10.0, 0.01, 20);
    engine->simulate();
}

