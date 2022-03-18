#include <gtest/gtest.h>
#include "../PetriNets/Transition.hpp"

TEST(ImmediateTransitionFire, BasicAssertions) 
{
  auto engine = shared_ptr<PetriNetsEngine>(new PetriNetsEngine());
  auto inPlace = shared_ptr<Place>(new Place("Input Place", 1));
  auto outPlace = shared_ptr<Place>(new Place("Output Place", 0));
  auto inArch = shared_ptr<InputArch>(new InputArch(inPlace));
  auto outArch = shared_ptr<OutputArch>(new OutputArch(outPlace));
  auto transition = ImmediateTransition("Transition",inArch, outArch);
  
  EXPECT_EQ(transition.allInputArchSsatisfied(), 1);
  transition.fire(-1);
  EXPECT_EQ(inPlace->tokens(), 0);
  EXPECT_EQ(outPlace->tokens(), 1);
}

TEST (TimedTransitionFire, BasicAssertions)
{
  auto inPlace = shared_ptr<Place>(new Place("Input Place", 1));
  auto outPlace = shared_ptr<Place>(new Place("Output Place", 0));
  auto inArch = shared_ptr<InputArch>(new InputArch(inPlace));
  auto outArch = shared_ptr<OutputArch>(new OutputArch(outPlace));
  auto transition = TimedTransition("Transition",inArch, outArch, 0);
  
  EXPECT_EQ(transition.allInputArchSsatisfied(), 1);
  transition.fire(-1);
  EXPECT_EQ(inPlace->tokens(), 0);
  EXPECT_EQ(outPlace->tokens(), 1);
}