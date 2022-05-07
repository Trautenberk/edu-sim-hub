#include <gtest/gtest.h>
#include "../../PetriNets/PetriNetsEngine.hpp"
#include "../../PetriNets/Place.hpp"
#include "../../PetriNets/Arc.hpp"
#include "../../PetriNets/Transition.hpp"
#include <iostream>


TEST(SimpleSimWithImmediateTransition, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto placeOne = Place::New(engine, 1);
    auto placeTwo = Place::New(engine, 0);
    auto inputArc = InputArc::New(engine, placeOne);
    auto outputArc = OutputArc::New(engine, placeTwo);
    auto transition = ImmediateTransition::New(engine, vector<InputArcObj>{inputArc}, vector<OutputArcObj>{outputArc});
    EXPECT_EQ(engine, transition->engine);
    engine->init(10);
    engine->simulate();
    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeTwo->tokens(), 1);
    EXPECT_EQ(engine->time(), 0);
}

TEST(SimpleSimWithTimedConstantTransition, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto placeOne = Place::New(engine, 1);
    auto placeTwo = Place::New(engine, 0);
    auto inputArc = InputArc::New(engine, placeOne);
    auto outputArc = OutputArc::New(engine, placeTwo);
    auto transition = TimedConstantTransition::New(engine, vector<InputArcObj> {inputArc}, vector<OutputArcObj> {outputArc}, 5);
    
    EXPECT_EQ(engine, transition->engine);
    engine->init(10);
    engine->simulate();
    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeTwo->tokens(), 1);
    EXPECT_EQ(engine->time(), 5);
}

TEST(SimpleSimWithTimedExponenetialTransition, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto placeOne = Place::New(engine, 1);
    auto placeTwo = Place::New(engine, 0);
    auto inputArc = InputArc::New(engine, placeOne);
    auto outputArc = OutputArc::New(engine, placeTwo);
    auto transition = TimedExponentialTransition::New(engine,  vector<InputArcObj> {inputArc}, vector<OutputArcObj> {outputArc}, 5);
    
    EXPECT_EQ(engine, transition->engine);
    engine->init(100);
    engine->simulate();
    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeTwo->tokens(), 1);
    EXPECT_TRUE(engine->time() > 0);
}


TEST(testImmediateAndTimedConstantTransition, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto placeOne = Place::New(engine, 1);
    auto placeTwo = Place::New(engine, 0);
    auto placeThree = Place::New(engine, 0);
    auto inputImmediate = InputArc::New(engine, placeOne);
    auto outputImmediate = OutputArc::New(engine, placeTwo);
    auto inputTimed = InputArc::New(engine, placeOne);
    auto outputTimed = OutputArc::New(engine, placeThree);
    auto immediate = ImmediateTransition::New(engine, vector<InputArcObj> {inputImmediate}, vector<OutputArcObj> {outputImmediate});
    auto timed = TimedConstantTransition::New(engine, vector<InputArcObj> {inputTimed}, vector<OutputArcObj> {outputTimed}, 5);

    engine->init(10);
    engine->simulate();
    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeTwo->tokens(), 1);
    EXPECT_EQ(placeThree->tokens(), 0);
    EXPECT_EQ(immediate->firedCnt(), 1);
    EXPECT_EQ(timed->firedCnt(), 0);
}

TEST(testImmediateAndTimedConstantTransitionTwo, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto placeOne = Place::New(engine, 5);
    auto placeTwo = Place::New(engine, 2);
    auto placeThree = Place::New(engine, 0);
    auto placeFour = Place::New(engine, 0);

    auto inputImmediate = InputArc::New(engine, placeOne);
    auto inputImmediateTwo = InputArc::New(engine, placeTwo);
    auto outputImmediate = OutputArc::New(engine, placeThree);

    auto inputTimed = InputArc::New(engine, placeOne);
    auto outputTimed = OutputArc::New(engine, placeFour);

    auto immediate = ImmediateTransition::New(engine, vector<InputArcObj> {inputImmediate, inputImmediateTwo}, vector<OutputArcObj> {outputImmediate});
    auto timed = TimedConstantTransition::New(engine, vector<InputArcObj> {inputTimed}, vector<OutputArcObj> {outputTimed}, 5);

    engine->init(10);
    engine->simulate();

    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeTwo->tokens(), 0);
    EXPECT_EQ(placeThree->tokens(), 2);
    EXPECT_EQ(placeFour->tokens(), 3);
    EXPECT_EQ(immediate->firedCnt(), 2);
    EXPECT_EQ(timed->firedCnt(), 3);
}


TEST(SimpleSimWithTimedConstantTransitionTwo, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto placeOne = Place::New(engine, 5);
    auto placeTwo = Place::New(engine, 0);
    auto inputArc = InputArc::New(engine, placeOne);
    auto outputArc = OutputArc::New(engine, placeTwo, 2);
    auto transition = TimedConstantTransition::New(engine, vector<InputArcObj> {inputArc}, vector<OutputArcObj> {outputArc}, 5);

    auto placeThree = Place::New(engine, 0);
    auto iputArcTwo = InputArc::New(engine, placeTwo);
    auto outputArcTwo = OutputArc::New(engine, placeThree);
    auto transitionTwo = TimedConstantTransition::New(engine, vector<InputArcObj> {iputArcTwo}, vector<OutputArcObj> {outputArcTwo}, 5);
    
    EXPECT_EQ(engine, transition->engine);
    engine->init(10);
    engine->simulate();
    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeThree->tokens(), 10);
    EXPECT_EQ(engine->time(), 10);
}