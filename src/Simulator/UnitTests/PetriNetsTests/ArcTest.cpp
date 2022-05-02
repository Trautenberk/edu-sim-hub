#include <gtest/gtest.h>
#include "../../PetriNets/Place.hpp"
#include "../../PetriNets/Arc.hpp"
#include "../../PetriNets/PetriNetsEngine.hpp"


TEST(InputArcExecute, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto place = Place::New(engine, "Test", 2);
    auto inputArc = InputArc::New(engine, place);
    EXPECT_EQ(inputArc->targetPlace, place);
    inputArc->execute();
    EXPECT_EQ(place->tokens(),1);
}

TEST(InputArcWeightedExecute, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto place = Place::New(engine, "Test", 10);
    auto inputArc = InputArc::New(engine, place, 3);
    EXPECT_EQ(inputArc->targetPlace, place);
    inputArc->execute();
    EXPECT_EQ(place->tokens(), 7);
    inputArc->execute();
    EXPECT_EQ(place->tokens(), 4);    
}

TEST(InputArcSatisfied, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto place = Place::New(engine, "Test", 0);
    auto inputArc = InputArc::New(engine, place);
    EXPECT_EQ(inputArc->satisfied(), 0);
    place->addTokens(1);
    EXPECT_EQ( inputArc->satisfied(), 1);
    place->addTokens(4);
    EXPECT_EQ(inputArc->satisfied(), 5);
}


TEST(InputArcWeightedSatisfied, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto place = Place::New(engine, "Test", 0);
    auto inputArc = InputArc::New(engine, place,3);
    EXPECT_EQ(inputArc->satisfied(), 0);
    place->addTokens(2);
    EXPECT_EQ(inputArc->satisfied(), 0);
    place->addTokens(1);
    EXPECT_EQ(inputArc->satisfied(), 1);
    place->addTokens(6);
    EXPECT_EQ(inputArc->satisfied(), 3);
}

TEST(OutputArcExecute, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto place = Place::New(engine, "Test", 0);
    auto outputArc = OutputArc::New(engine, place);
    EXPECT_EQ(outputArc->targetPlace, place);
    outputArc->execute();
    EXPECT_EQ(place->tokens(),1);    
}


TEST(OutputArcWeightedExecute, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto place = Place::New(engine, "Test", 0);
    auto outputArc = OutputArc::New(engine, place, 5);
    EXPECT_EQ(outputArc->targetPlace, place);
    outputArc->execute();
    EXPECT_EQ(place->tokens(),5);
    outputArc->execute();
    EXPECT_EQ(place->tokens(),10);
}

