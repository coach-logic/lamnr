import { flowGeneratorFn } from "./laminar.generator.js";
import { throwMissingFlowError } from "./laminar.errors.js";

export function createFlow({ middleware=[] }) {
  return {
    pushFlow: async function pushFlow({ flow=throwMissingFlowError(), args = {}, goto = null, meta }) {
      const generator = flowGeneratorFn({ flow, goto, args, middleware });
      for (const directive of generator) {
        await directive({ ...meta, pushFlow, generator, id: flow.name });
      }
    }
  }
}