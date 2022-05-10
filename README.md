# Edu-sim-hub

Aplikace obsahuje jednoduchý editor a simulátor Časovaných stochastických Petriho sítí a spojitých blokových schémat.
Editor byl implementován pomocí jazyku typescript a knihoven React a Redux. Jeho primárním účelem je poskytnout uživateli
prostředky pro tvorbu modelu. O simulaci vytvořeného modelu se pak stará simulátor napsaný v jazyce C++ a pomocí nástroje
Emscripten zkompilován do WebAssembly modulu a propojen s editorem. V této složce jsou obsaženy veškeré zdrojové kódy projektu a slouží pouze pro vývoj. Funkční aplikace je dostupná na adrese: https://trautenberk.github.io/edu-sim-hub/

***
## Struktura projektu?
Zdrojové kódy se nachází ve složce src a kódy jednotlivých částí se nachází ve oddělených složkách Editor a Simulator.

***
## Prerekvizity
* Nainstalovaný nástroj emscripten pro překlad do webassembly dostupný zde: https://emscripten.org/index.html
* Node.js v16 (poslední LTS)
* CMake pro sestavení simulátoru

***
## Kompilace simulátoru do WebAssembly:
Pro kompilaci simulátoru byly vytvořeny následující skripty:

* configure.sh:  Vytvoří soubory sestavení pomocí CMake
* build.sh : Zkompiluje simulátor do WebAssembly a umístí modul do složky wasm-build, Editor počítá s tím že soubor se bude nacházet na pevně daném místě
* clear.sh : Smaže obsah složky wasm-build

## Kompilace simulátoru pro desktop:
Konfigurační soubory CMakeLists byly napsány tak, aby šlo simulátor sestavit i pro desktop.
Složka Simulator obsahuje stejné skripty jako v předchozí části, akorát je výsledkem desktop knihovna.

***
## Jak zkompilovat aplikaci?
1. Nainstalovat všechny potřebné balíčky pomocí příkazu npm install
2. Pomocí příkazu npm run build dojde ke kompilaci simulátoru a editoru
3. Příkaz npm start spustí vývojový webový server s aplikací na portu localhost:3000

***

## Dokumentace
* Vygenerovaná dokumentace se nachází ve složce docs.
* Obě části mají oddělenou dokumentaci a pro její vygenerování slouží skript docs.sh. Dokumentaci lze vygenerovat až po sestavení aplikace.
