#include <gtest/gtest.h>
#include "../../PetriNets/Transition.hpp"

TEST(ImmediateTransitionFire, BasicAssertions) 
{
  auto engine = PetriNetsEngine::New();

  auto inPlace = Place::New(engine, "Input Place", 1);
  auto outPlace = Place::New(engine, "Output Place", 0);
  auto inArch = InputArch::New(engine, inPlace);
  auto outArch = OutputArch::New(engine, outPlace);
  auto transition = ImmediateTransition::New(engine, "Transition", {inArch}, {outArch});
  
  EXPECT_EQ(transition->allInputArchSsatisfied(), 1);
  transition->fire(-1);
  EXPECT_EQ(inPlace->tokens(), 0);
  EXPECT_EQ(outPlace->tokens(), 1);
}


TEST (TimedTransitionFire, BasicAssertions)
{
  auto engine = PetriNetsEngine::New();
  auto inPlace = Place::New(engine, "Input Place", 1);
  auto outPlace = Place::New(engine, "Output Place", 0);
  auto inArch = InputArch::New(engine, inPlace);
  auto outArch = OutputArch::New(engine, outPlace);
  auto transition = TimedTransition::New(engine, "Transition", {inArch}, {outArch}, 0);
  
  EXPECT_EQ(transition->allInputArchSsatisfied(), 1);
  transition->fire(-1);
  EXPECT_EQ(inPlace->tokens(), 0);
  EXPECT_EQ(outPlace->tokens(), 1);
}

