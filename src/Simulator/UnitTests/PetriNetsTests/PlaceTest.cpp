#include <gtest/gtest.h>
#include "../../PetriNets/Place.hpp"
#include "../../PetriNets/PetriNetsEngine.hpp"

TEST(AddTokens, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto place = Place::New(engine, 0);
    EXPECT_EQ(place->tokens(),0);
    place->addTokens(5);
    EXPECT_EQ(place->tokens(),5);
    place->addTokens(10);
    EXPECT_EQ(place->tokens(),15);
}

TEST(RemoveTokens, BasicAssertions) 
{
    auto engine = PetriNetsEngine::New();
    auto place = Place::New(engine, 15);
    EXPECT_EQ(place->tokens(),15);
    place->removeTokens(5);
    EXPECT_EQ(place->tokens(), 10);
    place->removeTokens(10);
    EXPECT_EQ(place->tokens(), 0);
}

TEST(RemoveTokensException, BasicAssertions)
{
    try
    {
        auto engine = PetriNetsEngine::New();
        auto place = Place::New(engine, 3);
        place->removeTokens(4);
        FAIL();
    }
    catch (const char* msg)
    {
        SUCCEED();
    }
}