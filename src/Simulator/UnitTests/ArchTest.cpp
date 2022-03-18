#include <gtest/gtest.h>
#include "../PetriNets/Place.hpp"
#include "../PetriNets/Arch.hpp"
#include "../PetriNets/PetriNetsEngine.hpp"


TEST(InputArchExecute, BasicAssertions)
{
    auto engine = shared_ptr<PetriNetsEngine> (new PetriNetsEngine());
    auto place = shared_ptr<Place>(new Place(engine, "Test", 2));
    auto inputArch = InputArch(engine, place);
    EXPECT_EQ(inputArch.targetPlace, place);
    inputArch.execute();
    EXPECT_EQ(place->tokens(),1);
}

TEST(InputArchWeightedExecute, BasicAssertions)
{
    auto engine = shared_ptr<PetriNetsEngine> (new PetriNetsEngine());
    auto place = shared_ptr<Place>(new Place(engine, "Test", 10));
    auto inputArch = InputArch(engine, place, 3);
    EXPECT_EQ(inputArch.targetPlace, place);
    inputArch.execute();
    EXPECT_EQ(place->tokens(), 7);
    inputArch.execute();
    EXPECT_EQ(place->tokens(), 4);    
}

TEST(InputArchSatisfied, BasicAssertions)
{
    auto engine = shared_ptr<PetriNetsEngine> (new PetriNetsEngine());
    auto place = shared_ptr<Place>(new Place(engine, "Test", 0));
    auto inputArch = InputArch(engine, place);
    EXPECT_EQ(inputArch.satisfied(), 0);
    place->addTokens(1);
    EXPECT_EQ( inputArch.satisfied(), 1);
    place->addTokens(4);
    EXPECT_EQ(inputArch.satisfied(), 5);
}


TEST(InputArchWeightedSatisfied, BasicAssertions)
{
    auto engine = shared_ptr<PetriNetsEngine> (new PetriNetsEngine());
    auto place = shared_ptr<Place>(new Place(engine, "Test", 0));
    auto inputArch = InputArch(engine, place,3);
    EXPECT_EQ(inputArch.satisfied(), 0);
    place->addTokens(2);
    EXPECT_EQ(inputArch.satisfied(), 0);
    place->addTokens(1);
    EXPECT_EQ(inputArch.satisfied(), 1);
    place->addTokens(6);
    EXPECT_EQ(inputArch.satisfied(), 3);
}

TEST(OutputArchExecute, BasicAssertions)
{
    auto engine = shared_ptr<PetriNetsEngine> (new PetriNetsEngine());
    auto place = shared_ptr<Place>(new Place(engine, "Test", 0));
    auto outputArch = OutputArch(engine, place);
    EXPECT_EQ(outputArch.targetPlace, place);
    outputArch.execute();
    EXPECT_EQ(place->tokens(),1);    
}


TEST(OutputArchWeightedExecute, BasicAssertions)
{
    auto engine = shared_ptr<PetriNetsEngine> (new PetriNetsEngine());
    auto place = shared_ptr<Place>(new Place(engine, "Test", 0));
    auto outputArch = OutputArch(engine, place, 5);
    EXPECT_EQ(outputArch.targetPlace, place);
    outputArch.execute();
    EXPECT_EQ(place->tokens(),5);
    outputArch.execute();
    EXPECT_EQ(place->tokens(),10);
}
