#include <gtest/gtest.h>
#include "../PetriNets/Place.hpp"
#include "../PetriNets/Arch.hpp"


TEST(InputArchExecute, BasicAssertions)
{
    auto place = shared_ptr<Place>(new Place("Test", 2));
    auto inputArch = InputArch(place);
    EXPECT_EQ(inputArch.targetPlace, place);
    inputArch.execute();
    EXPECT_EQ(place->tokens(),1);    
}

TEST(InputArchSatisfied, BasicAssertions)
{
    auto place = shared_ptr<Place>(new Place("Test", 0));
    auto inputArch = InputArch(place);
    EXPECT_EQ(inputArch.satisfied(), 0);
    place->addTokens(1);
    EXPECT_EQ( inputArch.satisfied(), 1);
    place->addTokens(4);
    EXPECT_EQ(inputArch.satisfied(), 5);
}

TEST(OutputArchExecute, BasicAssertions)
{
    auto place = shared_ptr<Place>(new Place("Test", 0));
    auto outputArch = OutputArch(place);
    EXPECT_EQ(outputArch.targetPlace, place);
    outputArch.execute();
    EXPECT_EQ(place->tokens(),1);    
}



