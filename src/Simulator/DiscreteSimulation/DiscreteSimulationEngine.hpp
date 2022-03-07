#include "Calendar.hpp"

class DiscreteSimulationEngine {
    public:
        void init(float beginTime,float endTime);
        void simulate();
        DiscreteSimulationEngine();
    private:
        float _beginTime;
        float _endTime;
};