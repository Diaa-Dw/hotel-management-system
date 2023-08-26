import { supabase, supabaseUrl } from "./supabase";

export const getCabins = async () => {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("somthing went wrong while fetching data");

  return cabins;
};

export const createEditCabin = async (newCabin, id) => {
  console.log(newCabin);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //1.create Cabin

  console.log(hasImagePath);
  console.log(newCabin.image);
  const ImageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const ImagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${ImageName}`;
  //https://nuocmmngtqhkcybrqenc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  let query = supabase.from("cabins");
  //create
  if (!id) {
    query = query.insert([{ ...newCabin, image: ImagePath }]);
  }

  //edit
  if (id) query = query.update({ ...newCabin, image: ImagePath }).eq("id", id);
  const { data, error } = await query.select().single();
  if (error) throw new Error("somthing went wrong while inserting data");
  console.log(data);
  //2. update image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(ImageName, newCabin.image);

  //3. Delete cabin if there was an error  uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
  }
  return data;
};

export const deleteCabins = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("somthing went wrong while deleting");
  console.log(data);
  return data;
};
