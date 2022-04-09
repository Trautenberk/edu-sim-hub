#include <gtest/gtest.h>
#include "../../PetriNets/Transition.hpp"

TEST(ImmediateTransitionFire, BasicAssertions) 
{
  auto engine = shared_ptr<PetriNetsEngine> (new PetriNetsEngine());
  auto inPlace = shared_ptr<Place>(new Place(engine, "Input Place", 1));
  auto outPlace = shared_ptr<Place>(new Place(engine, "Output Place", 0));
  auto inArch = shared_ptr<InputArch>(new InputArch(engine, inPlace));
  auto outArch = shared_ptr<OutputArch>(new OutputArch(engine, outPlace));
  auto transition = ImmediateTransition(engine, "Transition", {inArch}, {outArch});
  
  EXPECT_EQ(transition.allInputArchSsatisfied(), 1);
  transition.fire(-1);
  EXPECT_EQ(inPlace->tokens(), 0);
  EXPECT_EQ(outPlace->tokens(), 1);
}


TEST (TimedTransitionFire, BasicAssertions)
{
  auto engine = shared_ptr<PetriNetsEngine> (new PetriNetsEngine());
  auto inPlace = shared_ptr<Place>(new Place(engine, "Input Place", 1));
  auto outPlace = shared_ptr<Place>(new Place(engine, "Output Place", 0));
  auto inArch = shared_ptr<InputArch>(new InputArch(engine, inPlace));
  auto outArch = shared_ptr<OutputArch>(new OutputArch(engine, outPlace));
  auto transition = TimedTransition(engine, "Transition", {inArch}, {outArch}, 0);
  
  EXPECT_EQ(transition.allInputArchSsatisfied(), 1);
  transition.fire(-1);
  EXPECT_EQ(inPlace->tokens(), 0);
  EXPECT_EQ(outPlace->tokens(), 1);
}

