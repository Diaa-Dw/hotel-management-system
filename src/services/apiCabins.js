import { supabase } from "./supabase";

export const getCabins = async () => {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("somthing went wrong while fetching data");

  return cabins;
};

export const createCabin = async (newCabin) => {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();
  if (error) throw new Error("somthing went wrong while inserting data");
  return data;
};

export const deleteCabins = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("somthing went wrong while deleting");
  console.log(data);
  return data;
};
