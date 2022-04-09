#include <gtest/gtest.h>
#include "../../IntegrationMethods/IntegrationMethods.hpp"
#include <iostream>


#define f_one(x) 1 


TEST(EulerBasicTest, BasicAssertions)
{

    double x = 0.0;
    double stepSize = 0.1;
    double initValue = 0;
    
    double currentState = initValue;
    int iteration = 0;

    while (x < 5.0)
    {
        currentState = IntegrationMethods::Euler(currentState, f_one(x), stepSize);

            if(iteration % 10 == 0)
            std::cout << "X: " << x <<  " CurrentState: " << currentState << std::endl;
        
        x += stepSize;
        iteration++;
    }
    std::cout << "X: " << x <<  " CurrentState: " << currentState << std::endl;
}

#define f_two(x) 2 * x

TEST(EulerAdvancedTest, BasicAssertions)
{
    double x = 0.0;
    double stepSize = 0.1;
    double initValue = 0;
    
    double currentState = initValue;
    int iteration = 0;

    while (x < 5.0)
    {
        currentState = IntegrationMethods::Euler(currentState, f_two(x), stepSize);

        if(iteration % 10 == 0)
            std::cout << "X: " << x <<  " CurrentState: " << currentState << std::endl;
        x += stepSize;

        iteration++;
    }
    std::cout << "X: " << x <<  " CurrentState: " << currentState << std::endl;
}


