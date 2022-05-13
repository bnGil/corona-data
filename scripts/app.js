import { createWorldObj } from "./worldObj.js";

async function paintPage() {
  const worldObj = await createWorldObj();
  console.log(worldObj);
}

paintPage();
