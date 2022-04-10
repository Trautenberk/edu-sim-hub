#include "IntegrationMethods.hpp"

////////////////////////////////
/// y` = f(t, y(t))
/// Eulerova metoda: y(t + h) = y(t) + h * f(t, y(t))
////////////////////////////////

double IntegrationMethods::Euler(double currentState, double derivation, double step) {
    return currentState + (step * derivation);
}
