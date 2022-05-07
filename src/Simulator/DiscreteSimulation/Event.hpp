#ifndef EVENT_H
#define EVENT_H

#include <functional>

using namespace std;

/**
 * @brief Struktura eventu. Pro jednoduchost slouží rovnou jako záznam kalendáře.
 * 
 */
struct Event {
    public:
        /**
         * @brief Identifikátor události
         */
        int id;
        /**
         * @brief Priorita 
         */
        int priority = 0;
        /**
         * @brief Aktivační čas
         */
        double time;
        /**
         * @brief Lambda funkce obsahující logiku události
         * 
         */
        function<void(int eventId)> func;
        /**
         * @brief Konstruktor
         * 
         * @param _time 
         * @param _func 
         * @param priority 
         */
        Event(double _time, function<void(int eventId)> _func, int priority = 0);
    private:
        static int _cnt;
        bool _canceled = false;
};

#endif  