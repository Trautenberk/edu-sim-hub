#include <gtest/gtest.h>
#include "../../PetriNets/PetriNetsEngine.hpp"
#include "../../PetriNets/Place.hpp"
#include "../../PetriNets/Arch.hpp"
#include "../../PetriNets/Transition.hpp"
#include <iostream>


TEST(SimpleSimWithImmediateTransition, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto placeOne = Place::New(engine, "Place 1", 1);
    auto placeTwo = Place::New(engine, "Place 2", 0);
    auto inputArch = InputArch::New(engine, placeOne);
    auto outputArch = OutputArch::New(engine, placeTwo);
    auto transition = ImmediateTransition::New(engine, "Transition 1", vector<InputArchObj>{inputArch}, vector<OutputArchObj>{outputArch});
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
    auto placeOne = Place::New(engine, "Place 1", 1);
    auto placeTwo = Place::New(engine, "Place 2", 0);
    auto inputArch = InputArch::New(engine, placeOne);
    auto outputArch = OutputArch::New(engine, placeTwo);
    auto transition = TimedConstantTransition::New(engine, "Transition 1", vector<InputArchObj> {inputArch}, vector<OutputArchObj> {outputArch}, 5);
    
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
    auto placeOne = Place::New(engine, "Place 1", 1);
    auto placeTwo = Place::New(engine, "Place 2", 0);
    auto inputArch = InputArch::New(engine, placeOne);
    auto outputArch = OutputArch::New(engine, placeTwo);
    auto transition = TimedExponentialTransition::New(engine, "Transition 1", vector<InputArchObj> {inputArch}, vector<OutputArchObj> {outputArch}, 5);
    
    EXPECT_EQ(engine, transition->engine);
    engine->init(10);
    engine->simulate();
    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeTwo->tokens(), 1);
    EXPECT_TRUE(engine->time() > 0);
}


TEST(testImmediateAndTimedConstantTransition, BasicAssertions)
{
    auto engine = PetriNetsEngine::New();
    auto placeOne = Place::New(engine, "Place 1", 1);
    auto placeTwo = Place::New(engine, "Place 2", 0);
    auto placeThree = Place::New(engine, "Place 3", 0);
    auto inputImmediate = InputArch::New(engine, placeOne);
    auto outputImmediate = OutputArch::New(engine, placeTwo);
    auto inputTimed = InputArch::New(engine, placeOne);
    auto outputTimed = OutputArch::New(engine, placeThree);
    auto immediate = ImmediateTransition::New(engine, "Immediate 1", vector<InputArchObj> {inputImmediate}, vector<OutputArchObj> {outputImmediate});
    auto timed = TimedConstantTransition::New(engine, "Timed 1", vector<InputArchObj> {inputTimed}, vector<OutputArchObj> {outputTimed}, 5);

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
    auto placeOne = Place::New(engine, "Place 1", 5);
    auto placeTwo = Place::New(engine, "Place 2", 2);
    auto placeThree = Place::New(engine, "Place 3", 0);
    auto placeFour = Place::New(engine, "Place 4", 0);

    auto inputImmediate = InputArch::New(engine, placeOne);
    auto inputImmediateTwo = InputArch::New(engine, placeTwo);
    auto outputImmediate = OutputArch::New(engine, placeThree);

    auto inputTimed = InputArch::New(engine, placeOne);
    auto outputTimed = OutputArch::New(engine, placeFour);

    auto immediate = ImmediateTransition::New(engine, "Immediate 1", vector<InputArchObj> {inputImmediate, inputImmediateTwo}, vector<OutputArchObj> {outputImmediate});
    auto timed = TimedConstantTransition::New(engine, "Timed 1", vector<InputArchObj> {inputTimed}, vector<OutputArchObj> {outputTimed}, 5);

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
    auto placeOne = Place::New(engine, "Place 1", 5);
    auto placeTwo = Place::New(engine, "Place 2", 0);
    auto inputArch = InputArch::New(engine, placeOne);
    auto outputArch = OutputArch::New(engine, placeTwo, 2);
    auto transition = TimedConstantTransition::New(engine, "Transition 1", vector<InputArchObj> {inputArch}, vector<OutputArchObj> {outputArch}, 5);

    auto placeThree = Place::New(engine, "Place 3", 0);
    auto iputArchTwo = InputArch::New(engine, placeTwo);
    auto outputArchTwo = OutputArch::New(engine, placeThree);
    auto transitionTwo = TimedConstantTransition::New(engine, "Transition 1", vector<InputArchObj> {iputArchTwo}, vector<OutputArchObj> {outputArchTwo}, 5);
    
    EXPECT_EQ(engine, transition->engine);
    engine->init(10);
    engine->simulate();
    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeThree->tokens(), 10);
    EXPECT_EQ(engine->time(), 10);
}