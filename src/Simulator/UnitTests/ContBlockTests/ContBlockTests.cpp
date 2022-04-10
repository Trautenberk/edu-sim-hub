#include <gtest/gtest.h>
#include "../../IntegrationMethods/IntegrationMethods.hpp"
#include "../../ContinousBlocks/Add.hpp"
#include "../../ContinousBlocks/Sub.hpp"
#include "../../ContinousBlocks/Mul.hpp"
#include "../../ContinousBlocks/Div.hpp"

#include "../../ContinousBlocks/Constant.hpp"
#include "../../ContinousBlocks/ContBlockEngine.hpp"
#include <iostream>


auto engine = ContBlockEngine::New(IntegrationMethods::Euler);
auto inputOne = Constant::New(engine, 1);
auto inputTwo = Constant::New(engine, 2);
auto inputThree = Constant::New(engine, 5);
auto inputFour = Constant::New(engine, 25);


TEST(AddBlock, BasicAssertions)
{   
    auto add = Add::New(engine, inputOne, inputTwo);

    EXPECT_EQ(add->value(), 3);
}

TEST(SubBlock, BasicAssertions)
{
    auto sub = Sub::New(engine, inputOne, inputTwo);
    EXPECT_EQ(sub->value(), -1);
}

TEST(MulBlock, BasicAssertions)
{
    auto mul = Mul::New(engine, inputThree, inputThree);
    EXPECT_EQ(mul->value(), 25);
}

TEST(DivBlock, BasicAssertions)
{
    auto div = Div::New(engine, inputFour, inputThree);
    EXPECT_EQ(div->value(), 5);
}
