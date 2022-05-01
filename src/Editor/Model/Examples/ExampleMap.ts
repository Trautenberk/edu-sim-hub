import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { FIRST_EXAMPLE } from "./ContBlocksExamples/FirstExample";
import { VAN_DER_POL_OSCILATOR } from "./ContBlocksExamples/FourthExample";
import { SECOND_EXAMPLE } from "./ContBlocksExamples/SecondExample";
import { THIRD_EXAMPLE } from "./ContBlocksExamples/ThirdExample";
import { DD1_EXAMPLE } from "./PetriNets/DD1SystemExample";
import { FAULT_EXAMPLE } from "./PetriNets/FaultExample";
import { GENERATOR_EXAMPLE } from "./PetriNets/GeneratorsExample";
import { MM5_EXAMPLE } from "./PetriNets/MM5Example";



export const PN_EXAMPLES_MAP : { [key : string] : Example } = {
  "Generátory" : GENERATOR_EXAMPLE,
  "D/D/1" : DD1_EXAMPLE,
  "M/M/5" : MM5_EXAMPLE,
  "Linka s výskytem poruchy" : FAULT_EXAMPLE,
}

export const CONT_EXAMPLES_MAP : { [key : string] : Example} = {
  "Konstanta a Integrátor" : FIRST_EXAMPLE,
  "x^2" : SECOND_EXAMPLE,
  "Kruhovy test" : THIRD_EXAMPLE,
  "Van der Polův oscilátor" : VAN_DER_POL_OSCILATOR
} 