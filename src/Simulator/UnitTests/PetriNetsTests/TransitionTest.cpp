#include <gtest/gtest.h>
#include "../../PetriNets/Transition.hpp"

TEST(ImmediateTransitionFire, BasicAssertions) 
{
  auto engine = PetriNetsEngine::New();

  auto inPlace = Place::New(engine, 1);
  auto outPlace = Place::New(engine, 0);
  auto inArc = InputArc::New(engine, inPlace);
  auto outArc = OutputArc::New(engine, outPlace);
  auto transition = ImmediateTransition::New(engine, {inArc}, {outArc});
  
  EXPECT_EQ(transition->allInputArcSsatisfied(), 1);
  transition->fire(-1);
  EXPECT_EQ(inPlace->tokens(), 0);
  EXPECT_EQ(outPlace->tokens(), 1);
}


TEST (TimedTransitionFire, BasicAssertions)
{
  auto engine = PetriNetsEngine::New();
  auto inPlace = Place::New(engine, 1);
  auto outPlace = Place::New(engine, 0);
  auto inArc = InputArc::New(engine, inPlace);
  auto outArc = OutputArc::New(engine, outPlace);
  auto transition = TimedConstantTransition::New(engine, {inArc}, {outArc}, 0);
  
  EXPECT_EQ(transition->allInputArcSsatisfied(), 1);
  transition->fire(-1);
  EXPECT_EQ(inPlace->tokens(), 0);
  EXPECT_EQ(outPlace->tokens(), 1);
}


TEST(TimedExpoonentialTransitionFire, BasicAssertions)
{
  auto engine = PetriNetsEngine::New();
  auto inPlace = Place::New(engine, 1);
  auto outPlace = Place::New(engine, 0);
  auto inArc = InputArc::New(engine, inPlace);
  auto outArc = OutputArc::New(engine, outPlace);
  auto transition = TimedExponentialTransition::New(engine, {inArc}, {outArc}, 10);
  EXPECT_EQ(transition->allInputArcSsatisfied(), 1);
  transition->fire(-1);
  EXPECT_EQ(inPlace->tokens(), 0);
  EXPECT_EQ(outPlace->tokens(), 1); 
}
