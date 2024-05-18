import { RowDataPacket } from "mysql2";

import connection from "../config/db.config";

export const getPlaceById = async (id: string): Promise<RowDataPacket[]> => {
  const [rows] = await (
    await connection
  ).query<RowDataPacket[]>("SELECT * FROM places WHERE id = ?", [id]);
  return rows;
};

export const insertPlace = async (place: any) => {
  const {
    id,
    address_name,
    category_group_code,
    category_group_name,
    category_name,
    distance,
    phone,
    place_name,
    place_url,
    road_address_name,
    x,
    y,
  } = place;

  (await connection).query(
    `INSERT INTO places (
      id, address_name, category_group_code, category_group_name, category_name, 
      distance, phone, place_name, place_url, road_address_name, x, y
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      address_name,
      category_group_code,
      category_group_name,
      category_name,
      distance,
      phone,
      place_name,
      place_url,
      road_address_name,
      x,
      y,
    ]
  );
};

export const updatePlace = async (place: any) => {
  const {
    id,
    address_name,
    category_group_code,
    category_group_name,
    category_name,
    distance,
    phone,
    place_name,
    place_url,
    road_address_name,
    x,
    y,
  } = place;

  (await connection).query(
    `UPDATE places SET
      address_name = ?, category_group_code = ?, category_group_name = ?, category_name = ?, 
      distance = ?, phone = ?, place_name = ?, place_url = ?, road_address_name = ?, x = ?, y = ?
    WHERE id = ?`,
    [
      address_name,
      category_group_code,
      category_group_name,
      category_name,
      distance,
      phone,
      place_name,
      place_url,
      road_address_name,
      x,
      y,
      id,
    ]
  );
};

export const insertUserPlace = async (userId: number, placeId: string) => {
  (await connection).query(
    `INSERT INTO user_places (user_id, place_id) VALUES (?, ?)`,
    [userId, placeId]
  );
};
export const getUserPlacesByUserId = async (
  userId: number,
  limit: number,
  offset: number
): Promise<RowDataPacket[]> => {
  const [rows] = await (
    await connection
  ).query<RowDataPacket[]>(
    `SELECT places.*
     FROM user_places
     JOIN places ON user_places.place_id = places.id
     WHERE user_places.user_id = ?
     LIMIT ? OFFSET ?`,
    [userId, limit, offset]
  );
  return rows;
};
