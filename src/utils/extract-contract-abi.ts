import * as fs from "fs";
import * as path from "path";

const extractContractAbi = (inputPath: string, outputPath: string): void => {
  try {
    // Read the JSON file
    const rawData = fs.readFileSync(inputPath, "utf-8");
    const jsonData = JSON.parse(rawData);

    // Extract the "abi" section
    if (!jsonData.abi) {
      throw new Error(`The "abi" section is missing in the input file.`);
    }
    const abi = jsonData.abi;

    // Write the ABI to the output file
    fs.writeFileSync(outputPath, JSON.stringify(abi, null, 2), "utf-8");
    console.log(`ABI extracted and saved to ${outputPath}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};

// Run ABI extraction for given array of contracts
const contracts = ["BattleswapsRouter", "BattleswapsHook"];
contracts.forEach((contractName, i) => {
  const inputFilePath = path.resolve(
    __dirname,
    `../../../battleswaps-foundry/out/${contractName}.sol/${contractName}.json`
  );

  const outputFilePath = path.join(
    `${__dirname}/../abi/`,
    `${contractName}.json`
  );

  console.log("==================================");
  console.log("Processed files:");
  console.log(`${i + 1}. inputFilePath`, inputFilePath);
  console.log(`${i + 1}. outputFilePath`, outputFilePath);
  extractContractAbi(inputFilePath, outputFilePath);

  if (i === contracts.length - 1) {
    console.log("==================================");
  }
});
