import { supabase } from './config';

export const uploadImage = async (file, bucketName = 'images') => {
  try {
    const getFormattedDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
    
      return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    };
    const fileName = `${getFormattedDateTime()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file);

    if (error) throw error;

    // Get public URL of the uploaded image
    const imageUrl = supabase.storage.from(bucketName).getPublicUrl(fileName);
    // console.log(publicUrl);

    return {imageUrl,fileName};
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw new Error('Failed to upload image');
  }
};

export const saveDataToTable = async (tableName, data) => {
  try {
    // Check if the item already exists
    const { data: existingData, error: selectError } = await supabase
      .from(tableName)
      .select('*')
      .eq('item_name', data.item_name);

    // Handle errors during the select query
    if (selectError) {
      console.error('Error checking item existence:', selectError.message);
      throw new Error('Failed to check item existence');
    }

    // If the item exists, throw an error
    if (existingData.length > 0) {
      throw new Error('Item already exists');
    }

    // Insert the new item if it doesn't exist
    const { data: insertedData, error: insertError } = await supabase
      .from(tableName)
      .insert(data)
      .select();

    // Handle errors during the insert query
    if (insertError) {
      console.error('Error inserting item:', insertError.message);
      throw new Error('Failed to add item');
    }

    // Return success message with inserted data
    return { message: 'Item added successfully', insertedData };
  } catch (error) {
    console.error('Error saving data:', error.message);
    throw new Error(error.message); // Throw the error with the specific message
  }
};

export const getAllItemFromTable = async (tableName) => {
  try {
    const { data: existingData, error: selectError } = await supabase
    .from(tableName)
    .select('*')

    if (selectError) {
      console.error('Error checking item existence:', selectError.message);
      throw new Error('Failed to check item existence');
    }
    return existingData
  } catch (error) {
    console.error('no data found:', error.message);
    throw new Error(error.message);
    
  }
};
