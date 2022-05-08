import { Example } from "Editor/Feature/SimObjectManagementSlice";
import { FIRST_EXAMPLE } from "./ContBlocksExamples/FirstExample";
import { VAN_DER_POL_OSCILATOR } from "./ContBlocksExamples/FourthExample";
import { SECOND_EXAMPLE } from "./ContBlocksExamples/SecondExample";
import { SPRING_WEIGHT } from "./ContBlocksExamples/SpringWeight";
import { THIRD_EXAMPLE } from "./ContBlocksExamples/ThirdExample";
import { DD1_EXAMPLE } from "./PetriNets/DD1SystemExample";
import { FAULT_EXAMPLE } from "./PetriNets/FaultExample";
import { GENERATOR_EXAMPLE } from "./PetriNets/GeneratorsExample";
import { MM5_EXAMPLE } from "./PetriNets/MM5Example";
import { PRIORITY_QUEUE } from "./PetriNets/PriorityQueue";



export const PN_EXAMPLES_MAP : { [key : string] : Example } = {
  "Generátory" : GENERATOR_EXAMPLE,
  "Prioritní fronta" : PRIORITY_QUEUE,
  "D/D/1" : DD1_EXAMPLE,
  "M/M/5" : MM5_EXAMPLE,
  "Linka s výskytem poruchy" : FAULT_EXAMPLE,
}

export const CONT_EXAMPLES_MAP : { [key : string] : Example} = {
  "y = x" : FIRST_EXAMPLE,
  "y = x^2" : SECOND_EXAMPLE,
  "Kruhový test" : THIRD_EXAMPLE,
  "Van der Polův oscilátor" : VAN_DER_POL_OSCILATOR,
  "Systém závaží na pružině: y''+(-K/m)y = 0" : SPRING_WEIGHT
} 