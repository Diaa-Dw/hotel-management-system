import { supabase } from "./supabase";

export const getCabins = async()=>{ 

let { data: cabins, error } = await supabase
  .from('cabins')
  .select('*')
  if(error) throw new Error("somthing went wrong while fetching data");

  return cabins;
}
