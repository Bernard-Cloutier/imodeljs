import { assert } from "chai";
import { Format, FormatterSpec, ParseResult, ParserSpec, Quantity, QuantityError, QuantityStatus, UnitsProvider } from "@bentley/imodeljs-quantity";
import { QuantityFormatter, CustomFormatter, QuantityType } from "../QuantityFormatter";

class MyNewFormatter implements CustomFormatter {
  formatQuantity(magnitude: number, spec: FormatterSpec): string {
    if (magnitude && spec) // avoid unused variable error
      return "MyNewFormatter";
    return "shouldnt get here";
  }
  parseIntoQuantityValue(inString: string, spec: ParserSpec): ParseResult {
    if (inString && spec) // avoid unused variable error
      throw new Error("Method not implemented.");
    throw new Error("Method not implemented.");
  }
}

// class MyNewFormatterSpec extends FormatterSpec {
//   private _myProp: string;

//   public get MyProp(): string { return this._myProp; };

//   public constructor(myprop: string, other: FormatterSpec) {
//     super(other.name, other.format, other.unitConversions);
//     this._myProp = myprop;
//   }
// }

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

// describe("test", () => {
//   it("", () => {
//     let quantityFormatter = new QuantityFormatter();
//     quantityFormatter.registerFormatterForQuantityType("newQuantityType", MyNewFormatter);
//     let newFormatterSpec = quantityFormatter.getFormatterSpecByQuantityType("newQuantityType"); // needs to return specialized formatterSpec
//     quantityFormatter.formatQuantity(123, formatterSpec); // uses an instance of MyNewFormatter
//     let angleFormatterSpec = quantityFormatter.getFormatterSpecByQuantityType(QuantityType.Angle);
//     quantityFormatter.formatQuantity(123, angleFormatterSpec); // uses default formatter
//   });
// });

describe("Registering new formatter returns correct formatter spec", () => {
  it("test1", async () => {
    const expected = "MyNewFormatter";
    let quantityFormatter = new QuantityFormatter();
    const isRegisterSuccesful = quantityFormatter.registerFormatterForQuantityType("newQuantityType", MyNewFormatter);
    assert.isTrue(isRegisterSuccesful);
    let newFormatterSpec = await quantityFormatter.getFormatterSpecByQuantityType("newQuantityType");
    const actual = quantityFormatter.formatQuantity(0, newFormatterSpec);
    assert.equal(actual, expected);
  });
});

describe("Failing test", () => {
  it("test2", () => {
    assert.fail();
  });
});
