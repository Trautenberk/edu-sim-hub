#ifndef __SIMENGINE_H__
#define __SIMENGINE_H__

class SimEngine {
    public:
        double time();
        double endTime();
        virtual void simulate() = 0;

    protected:
        double _endTime = 0.0;
        double _time = 0.0;      // TODO cas by se dal vytahnout do spolecneho predka pro oba engine

};
#endif // __SIMENGINE_H__