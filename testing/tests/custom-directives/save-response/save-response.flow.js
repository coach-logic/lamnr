import { testFn } from "../../../helpers/test-fn.js";
import { callFlow } from "../../core-directives/call/call.flow.js";

export function secondaryFlow(args) { 
  return [
    { id: "id1", call: testFn, args },
    { id: "id2", call: testFn, args: 'step-2' },
    { id: "id3", call: testFn, args: 'step-3' }
  ];
}

export function saveResponse() { 
  return [
    { id: "id1a", call: () => ({ saved: true }), saveResponse: 'savedKey1' },
    { id: "id2a", call: (args) => args, useResponse: 'savedKey1', args: { passed: true }}
  ];
}

export function useResponseAsPushFlowArg() { 
  return [
    { id: "id1b", call: () => ({ useFlow: true }), saveResponse: 'savedKey2' },
    { id: "id2b", useResponse: 'savedKey2', pushFlow: (args) => ({ flow: args.savedKey2.useFlow ? secondaryFlow : () => {} }), args: { passed: true }},
    { id: "id3b", call: testFn, args: 'step-3b' }
  ];
}