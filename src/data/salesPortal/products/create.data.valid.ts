import { generateProductData} from 'data/salesPortal/products/generateProductData'
import { ICreateValidDataProduct } from 'data/types/product.types';
import _ from "lodash";

export const regValidTestData: ICreateValidDataProduct[] = [

{
  testName: "Success | Name with 3 alphanumerical characters",
  validCreationProductData: generateProductData({ name: "Ab3" })
},
{
  testName: "Success | Name with 40 alphanumerical characters",
  validCreationProductData: generateProductData({ name: "A".repeat(40) })
},
{
  testName: "Success | Name containing a single space between words",
  validCreationProductData: generateProductData({ name: "Abc Defgh" })
},
{
  testName: "Success | Minimum allowed price (1)",
  validCreationProductData: generateProductData({ price: 1 })
},
{
  testName: "Success | Maximum allowed price (99999)",
  validCreationProductData: generateProductData({ price: 99999 })
},
{
  testName: "Success | Minimum allowed amount (0)",
  validCreationProductData: generateProductData({ amount: 0 })
},
{
  testName: "Success | Maximum allowed amount (999)",
  validCreationProductData: generateProductData({ amount: 999 })
},
{
  testName: "Success | Empty notes field",
  validCreationProductData: generateProductData({ notes: "" })
},
{
  testName: "Success | Notes with 250 characters",
  validCreationProductData: generateProductData({ notes: "a".repeat(250) })
},
{
  testName: "Success | Notes containing special characters",
  validCreationProductData: generateProductData({ notes: "Notes +_-#$%@&*^!" })
}

]
