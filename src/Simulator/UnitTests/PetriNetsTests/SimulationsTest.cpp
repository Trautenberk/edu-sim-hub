#include <gtest/gtest.h>
#include "../../PetriNets/PetriNetsEngine.hpp"
#include "../../PetriNets/Place.hpp"
#include "../../PetriNets/Arch.hpp"
#include "../../PetriNets/Transition.hpp"
#include <iostream>


TEST(SimpleSimWithImmediateTransition, BasicAssertions)
{
    auto engine = make_shared<PetriNetsEngine>();
    auto placeOne = make_shared<Place>(engine, "Place 1", 1);
    auto placeTwo = make_shared<Place>(engine, "Place 2", 0);
    auto inputArch = make_shared<InputArch>(engine, placeOne);
    auto outputArch = make_shared<OutputArch>(engine, placeTwo);
    auto transition = make_shared<ImmediateTransition>(engine, "Transition 1", SPVec<InputArch>{inputArch}, SPVec<OutputArch>{outputArch});
    EXPECT_EQ(engine, transition->engine);
    engine->init(10);
    engine->simulate();
    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeTwo->tokens(), 1);
    EXPECT_EQ(engine->time(), 0);
    engine->clear();
}

TEST(SimpleSimWithTimedTransition, BasicAssertions)
{
    auto engine = make_shared<PetriNetsEngine>();
    auto placeOne = make_shared<Place>(engine, "Place 1", 1);
    auto placeTwo = make_shared<Place>(engine, "Place 2", 0);
    auto inputArch = make_shared<InputArch>(engine, placeOne);
    auto outputArch = make_shared<OutputArch>(engine, placeTwo);
    auto transition = make_shared<TimedTransition>(engine, "Transition 1", SPVec<InputArch> {inputArch}, SPVec<OutputArch> {outputArch}, 5);
    
    EXPECT_EQ(engine, transition->engine);
    engine->init(10);
    engine->simulate();
    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeTwo->tokens(), 1);
    EXPECT_EQ(engine->time(), 5);
}

TEST(testImmediateAndTimedTransition, BasicAssertions)
{
    auto engine = make_shared<PetriNetsEngine>();
    auto placeOne = make_shared<Place>(engine, "Place 1", 1);
    auto placeTwo = make_shared<Place>(engine, "Place 2", 0);
    auto placeThree = make_shared<Place>(engine, "Place 3", 0);
    auto inputImmediate = make_shared<InputArch>(engine, placeOne);
    auto outputImmediate = make_shared<OutputArch>(engine, placeTwo);
    auto inputTimed = make_shared<InputArch>(engine, placeOne);
    auto outputTimed = make_shared<OutputArch>(engine, placeThree);
    auto immediate = make_shared<ImmediateTransition>(engine, "Immediate 1", SPVec<InputArch> {inputImmediate}, SPVec<OutputArch> {outputImmediate});
    auto timed = make_shared<TimedTransition>(engine, "Timed 1", SPVec<InputArch> {inputTimed}, SPVec<OutputArch> {outputTimed}, 5);

    engine->init(10);
    engine->simulate();
    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeTwo->tokens(), 1);
    EXPECT_EQ(placeThree->tokens(), 0);
    EXPECT_EQ(immediate->firedCnt, 1);
    EXPECT_EQ(timed->firedCnt, 0);
    engine->clear();

}

TEST(testImmediateAndTimedTransitionTwo, BasicAssertions)
{
    auto engine = make_shared<PetriNetsEngine>();
    auto placeOne = make_shared<Place>(engine, "Place 1", 5);
    auto placeTwo = make_shared<Place>(engine, "Place 2", 2);
    auto placeThree = make_shared<Place>(engine, "Place 3", 0);
    auto placeFour = make_shared<Place>(engine, "Place 4", 0);

    auto inputImmediate = make_shared<InputArch>(engine, placeOne);
    auto inputImmediateTwo = make_shared<InputArch>(engine, placeTwo);
    auto outputImmediate = make_shared<OutputArch>(engine, placeThree);

    auto inputTimed = make_shared<InputArch>(engine, placeOne);
    auto outputTimed = make_shared<OutputArch>(engine, placeFour);

    auto immediate = make_shared<ImmediateTransition>(engine, "Immediate 1", SPVec<InputArch> {inputImmediate, inputImmediateTwo}, SPVec<OutputArch> {outputImmediate});
    auto timed = make_shared<TimedTransition>(engine, "Timed 1", SPVec<InputArch> {inputTimed}, SPVec<OutputArch> {outputTimed}, 5);

    engine->init(10);
    engine->simulate();

    EXPECT_EQ(placeOne->tokens(), 0);
    EXPECT_EQ(placeTwo->tokens(), 0);
    EXPECT_EQ(placeThree->tokens(), 2);
    EXPECT_EQ(placeFour->tokens(), 3);
    EXPECT_EQ(immediate->firedCnt, 2);
    EXPECT_EQ(timed->firedCnt, 3);
}