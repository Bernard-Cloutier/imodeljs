/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { assert } from "chai";
import { Format, FormatterSpec, ParseResult, ParserSpec, Quantity, QuantityError, QuantityStatus, UnitsProvider } from "@bentley/imodeljs-quantity";
import { QuantityFormatter, CustomFormatter, QuantityType } from "../QuantityFormatter";

class MyNewFormatter implements CustomFormatter {
  formatQuantity(magnitude: number, spec: FormatterSpec): string {
    if (undefined !== magnitude && undefined !== spec) // avoid unused variable error
      return "MyNewFormatter";
    return "shouldnt get here: spec is undefined: " + (undefined !== spec);
  }
  parseIntoQuantityValue(inString: string, spec: ParserSpec): ParseResult {
    if (inString && spec) // avoid unused variable error
      throw new Error("Method not implemented.");
    throw new Error("Method not implemented.");
  }
}

// class MyNewFormat extends Format {
//   private _myProp: string = "";

//   public get MyProp(): string { return this._myProp; };

//   public async fromJson(unitsProvider: UnitsProvider, jsonObj: any): Promise<void> {
//     super.fromJson(unitsProvider, jsonObj);

//     if (undefined !== jsonObj.MyProp) {
//       if (typeof (jsonObj.MyProp) !== "string") // MyProp must be a string IF it is defined
//         throw new QuantityError(QuantityStatus.InvalidJson, `The Format ${this.name} has an invalid 'MyProp' attribute. It should be of type 'string'.`);
//       this._myProp = jsonObj.MyProp;
//     }
//   }
// }


describe("Registering new formatter returns correct formatter spec", () => {
  it("test1", async () => {
    const expected = "MyNewFormatter";
    let quantityFormatter = new QuantityFormatter();
    const isRegisterSuccesful = await quantityFormatter.registerCustomQuantityFormatter("newQuantityType", MyNewFormatter);
    assert.isTrue(isRegisterSuccesful);
    let newFormatterSpec = await quantityFormatter.getFormatterSpecByQuantityType("newQuantityType");

    const actual = quantityFormatter.formatQuantity(0, newFormatterSpec);
    assert.equal(actual, expected);
  });
});
